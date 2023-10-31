import dayjs from 'dayjs'
import 'dayjs/locale/th'
import 'dayjs/locale/en'
import 'dayjs/locale/id'

import 'iconify-icon'
import App from './app.svelte'

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
init({
  fallbackLocale: defaultLanguage,
  initialLocale: locale,
})

const app = new App({
  target: document.getElementById('app')!,
})

export default app
