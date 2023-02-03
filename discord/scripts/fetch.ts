import { mkdir, writeFile } from 'fs/promises'
import { Env } from 'lazy-strict-env'
import { z } from 'zod'

const env = Env(
  z.object({
    GOOGLE_API_KEY: z.string(),
  }),
)

const url = `https://www.googleapis.com/calendar/v3/calendars/tech.cal.th%40gmail.com/events?${new URLSearchParams(
  {
    maxResults: '200',
    orderBy: 'updated',
    timeMin: new Date().toISOString(),
    key: env.GOOGLE_API_KEY,
  },
)}`

const res = await fetch(url)
if (!res.ok) throw new Error(`Failed to fetch calendar: ${res.status}`)

const data = (await res.json()) as { items: CalendarItem[] }
const output = ['📣 **Upcoming Events**']

type DateOrDateTime =
  | {
      dateTime: string
    }
  | {
      date: string
    }

interface CalendarItem {
  summary: string
  start: DateOrDateTime
  end: { dateTime: string } | { date: string }
}

const dateOf = (dateOrDateTime: DateOrDateTime) => {
  if ('dateTime' in dateOrDateTime) {
    return new Date(Date.parse(dateOrDateTime.dateTime) + 7 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]
  }
  return dateOrDateTime.date
}

const unixTimestampOf = (dateOrDateTime: DateOrDateTime) => {
  if ('dateTime' in dateOrDateTime) {
    return Math.floor(Date.parse(dateOrDateTime.dateTime) / 1000)
  }
  return Math.floor(Date.parse(dateOrDateTime.date + 'T00:00:00Z') / 1000)
}

const items = data.items
  .map((item) => {
    return {
      date: dateOf(item.start),
      time: unixTimestampOf(item.start),
      summary: item.summary,
    }
  })
  .sort((a, b) => a.date.localeCompare(b.date))

const dayOf = (date: string) => {
  const day = new Date(date).getDay()
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]
}

for (const item of items) {
  const day = dayOf(item.date)
  output.push(
    `🗓️ <t:${item.time}:D> (${day}, <t:${item.time}:R>) ${item.summary}`,
  )
}

output.push(
  '',
  '👉 For more information, visit [th.techcal.dev](https://th.techcal.dev/)',
)

const contents = output.join('\n')
console.log(contents)

await mkdir('.data', { recursive: true })
await writeFile('.data/upcoming.txt', contents)
