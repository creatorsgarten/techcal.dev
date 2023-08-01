import type { Dayjs } from 'dayjs'
import type { GoogleCalendar } from '$types/GoogleCalendar'
import { getGapiKey } from './getGapiKey'

export const getCalendarEvents = async (begin: Dayjs, end: Dayjs) => {
  let resp: GoogleCalendar = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${
      import.meta.env.VITE_CALENDAR_EMAIL
    }/events?${new URLSearchParams({
      key: getGapiKey(),
      timeMin: begin.toISOString(),
      timeMax: end.endOf('day').toISOString(),
      singleEvents: 'true',
      maxResults: '999',
    }).toString()}`
  ).then(o => {
    if (o.ok) return o.json()
    else throw o
  })

  return resp.items
}
