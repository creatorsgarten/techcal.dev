import type { GoogleCalendarItem } from "$types/GoogleCalendar"

export const getCalendarEvent = async (id: string) => {
  let resp: GoogleCalendarItem = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/tech.cal.th@gmail.com/events/${id}?${new URLSearchParams(
      {
        key: 'AIzaSyBpmxgK9dbso4pEYWvg47SOoIqIBB83Pno',
      }
    ).toString()}`,
    {
      headers: {
        referer: 'https://th.techcal.dev/',
      },
    }
  ).then(o => {
    if (o.ok) return o.json()
    else throw o
  })

  return resp
}
