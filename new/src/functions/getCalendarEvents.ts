import type { Dayjs } from "dayjs";
import type { GoogleCalendar } from "../@types/GoogleCalendar";

export const getCalendarEvents = async (begin: Dayjs, end: Dayjs) => {
  let resp: GoogleCalendar = await fetch(`https://www.googleapis.com/calendar/v3/calendars/tech.cal.th@gmail.com/events?${
    new URLSearchParams({
      key: 'AIzaSyABEaQAnCWPpjZ2dfvPR8zhtkmFkxddOn0',
      timeMin: begin.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: 'true',
      maxResults: '999'
    }).toString()
  }`, {
    headers: {
      referer: 'https://th.techcal.dev/'
    }
  }).then(o => {
    if (o.ok) return o.json()
    else throw o
  })

  return resp.items
}
