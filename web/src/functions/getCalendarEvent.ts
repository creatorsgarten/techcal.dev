import type { GoogleCalendarItem } from '$types/GoogleCalendar'

export const getCalendarEvent = async (id: string) => {
  let resp: GoogleCalendarItem = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${
      import.meta.env.VITE_CALENDAR_EMAIL
    }/events/${id}?${new URLSearchParams({
      key: 'AIzaSyBpmxgK9dbso4pEYWvg47SOoIqIBB83Pno',
    }).toString()}`
  ).then(o => {
    if (o.ok) return o.json()
    else throw o
  })

  return resp
}
