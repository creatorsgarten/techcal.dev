import dayjs from 'dayjs'

import type { Dayjs } from 'dayjs'
import type { GoogleCalendarItem } from '../@types/GoogleCalendar'

export const getEvents = (items: GoogleCalendarItem[], day: Dayjs) =>
  items.filter(item => {
    // @ts-ignore
    let startDay = dayjs(item.start.dateTime ?? item.start.date)
    // @ts-ignore
    let endDay = dayjs(item.end.dateTime ?? item.end.date)

    return day.isBetween(startDay.startOf('day'), endDay.endOf('day'))
  })
