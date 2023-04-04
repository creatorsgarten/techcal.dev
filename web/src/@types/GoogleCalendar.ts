export interface GoogleCalendar {
  accessRole: 'reader'
  defaultReminders: []
  etag: string
  kind: string
  nextSyncToken: string
  summary: string
  timeZone: string
  updated: string
  items: GoogleCalendarItem[]
}

export interface FullDay {
  date: string
}

export interface DayWithTime {
  dateTime: string
  timeZone: string
}

export interface GoogleCalendarItem {
  kind: string
  etag: string
  id: string
  status: string
  htmlLink: string
  created: string
  updated: string
  summary: string
  description: string
  location: string
  creator: {
    email: string
    self: boolean
  }
  organizer: {
    email: string
    self: boolean
  }
  start: FullDay | DayWithTime
  end: FullDay | DayWithTime
  transparency: string
  iCalUID: string
  sequence: number
  eventType: string
}
