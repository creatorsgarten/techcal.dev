import 'iconify-icon'
import App from './app.svelte'
import '@fontsource/anuphan/400.css'
import '@fontsource/anuphan/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import './styles/tailwind.css'

import { register, init, getLocaleFromNavigator } from 'svelte-i18n'

import { defaultLanguage } from '$locale'

register('en', () => import('./locale/json/en.json'))
register('id', () => import('./locale/json/id.json'))
register('th', () => import('./locale/json/th.json'))

init({
  fallbackLocale: defaultLanguage,
  initialLocale: getLocaleFromNavigator(),
})

const app = new App({
  target: document.getElementById('app')!,
})

export default app
