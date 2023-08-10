import { writable } from 'svelte/store'

import type { GoogleCalendarItem } from '$types/GoogleCalendar'

export const captureEvent = writable<GoogleCalendarItem | null>(null)
