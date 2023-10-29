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

init({
  fallbackLocale: defaultLanguage,
  initialLocale: LocaleManager.get(),
})

const app = new App({
  target: document.getElementById('app')!,
})

export default app
