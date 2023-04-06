import { id } from './lang/id'
import { th } from './lang/th'

import type { LocaleKey } from './@types/LocaleKey'

const locales = {
  th,
  id,
}

export const l = (key: LocaleKey) => {
  return locales[import.meta.env.VITE_LOCALE][key]
}
