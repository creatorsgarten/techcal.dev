import { writable } from 'svelte/store'

import type { GoogleCalendarItem } from '$types/GoogleCalendar'

export const activeEvent = writable<GoogleCalendarItem | null>(null)