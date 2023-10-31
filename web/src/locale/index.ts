import { _ } from 'svelte-i18n'

import type { Locale } from '$types/Locale'

export const l = _
export const defaultLanguage: Locale = import.meta.env.VITE_LOCALE
