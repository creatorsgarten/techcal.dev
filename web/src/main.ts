import dayjs from 'dayjs'
import 'dayjs/locale/th'
import 'dayjs/locale/en'
import 'dayjs/locale/id'

import 'iconify-icon'
import App from './app.svelte'
import { mount } from 'svelte'

import '@fontsource-variable/anuphan'
import '@fontsource-variable/inter'

import './styles/tailwind.css'

import { register, init } from 'svelte-i18n'

import { defaultLanguage } from '$locale'
import { LocaleManager } from '$functions/localeManager'

register('en', () => import('./locale/json/en.json'))
register('id', () => import('./locale/json/id.json'))
register('th', () => import('./locale/json/th.json'))

const locale = LocaleManager.get()
dayjs.locale(locale)

const initPromise = init({
  fallbackLocale: defaultLanguage,
  initialLocale: locale,
})

Promise.resolve(initPromise).then(() => {
  mount(App, {
    target: document.getElementById('app')!,
  })
})
