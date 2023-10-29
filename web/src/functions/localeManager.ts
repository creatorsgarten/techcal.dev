import { getLocaleFromNavigator } from 'svelte-i18n'

export class LocaleManager {
  private static localStorageKey = 'techcal:locale'

  public static get() {
    const localStorageItem = localStorage.getItem(this.localStorageKey)

    if (localStorageItem === null) {
      const navigatorLocale = getLocaleFromNavigator()

      if (navigatorLocale === null) return null
      else {
        this.set(navigatorLocale)
        return navigatorLocale
      }
    } else return localStorageItem
  }

  public static set(locale: string) {
    localStorage.setItem(this.localStorageKey, locale)
  }
}
