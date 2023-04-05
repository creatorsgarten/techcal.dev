import dayjs from 'dayjs'

import type { Dayjs } from 'dayjs'
import type { GoogleCalendarItem, DayWithTime, FullDay } from '../@types/GoogleCalendar'

export const getEvents = (items: GoogleCalendarItem[], day: Dayjs) =>
  items.filter(item => {
    let startDay = dayjs(
      (item.start as DayWithTime).dateTime ?? (item.start as FullDay).date,
      (item.start as DayWithTime).timeZone
    )
    let endDay = dayjs(
      (item.end as DayWithTime).dateTime ?? (item.end as FullDay).date,
      (item.end as DayWithTime).timeZone
    ).subtract(1, 'second')

    return day
      .add(1, 'second')
      .isBetween(startDay.startOf('day'), endDay.endOf('day'))
  })
