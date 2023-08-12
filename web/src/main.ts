import 'iconify-icon'
import App from './app.svelte'
import '@fontsource/anuphan/400.css'
import '@fontsource/anuphan/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import './styles/tailwind.css'

const app = new App({
  target: document.getElementById('app'),
})

export default app
