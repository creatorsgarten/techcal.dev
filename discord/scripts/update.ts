import { readFile } from 'fs/promises'
import { Env } from 'lazy-strict-env'
import { z } from 'zod'

const env = Env(
  z.object({
    DISCORD_WEBHOOK_URL: z.string().url(),
    DISCORD_MESSAGE_ID: z.string(),
  }),
)

const url = `${env.DISCORD_WEBHOOK_URL}/messages/${env.DISCORD_MESSAGE_ID}`
const res = await fetch(url, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    content: await readFile('.data/upcoming.txt', 'utf8'),
  }),
})
console.log(res.status, res.ok ? res.statusText : await res.text())
