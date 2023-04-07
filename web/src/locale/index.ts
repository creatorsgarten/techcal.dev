import selectedLang from '$selectedLang'

import type { LocaleKey } from '../@types/LocaleKey'

export const l = (key: LocaleKey) => {
  console.log({ selectedLang })
  return selectedLang[key]
}
