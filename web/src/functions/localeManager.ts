import dayjs from 'dayjs'
import { getLocaleFromNavigator } from 'svelte-i18n'
import { persistentAtom } from '@nanostores/persistent'

import { defaultLanguage } from '$locale'
import { Locale } from '$types/Locale'

const localStorageKey = 'techcal:locale'

export const localeAtom = persistentAtom(localStorageKey, defaultLanguage)

export class LocaleManager {
  public static get() {
    const localStorageItem = localeAtom.get()

    if (localStorageItem === null) {
      let navigatorLocale = getLocaleFromNavigator()

      if (navigatorLocale === null) return defaultLanguage
      else {
        if (navigatorLocale.startsWith('en')) navigatorLocale = Locale.English
        else if (navigatorLocale.startsWith('id'))
          navigatorLocale = Locale.Indonesian
        else if (navigatorLocale.startsWith('th')) navigatorLocale = Locale.Thai

        this.set(navigatorLocale as Locale)
        return navigatorLocale
      }
    } else return localStorageItem
  }

  public static set(locale: Locale) {
    dayjs.locale(locale)
    localeAtom.set(locale)
  }
}
