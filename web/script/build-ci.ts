import { SpawnOptions } from 'bun'
import fs from 'fs'

const spawnPromise = (cmd: string[], options?: SpawnOptions.OptionsObject) =>
  new Promise((res, rej) => {
    Bun.spawn(cmd, {
      ...options,
      onExit: (_, code) => {
        if (code === 0) res(code)
        else rej(code)
      },
    })
  })

// get all .env regions
const detectedEnvRegions = fs
  .readdirSync('.')
  .filter(
    o =>
      fs.statSync(o).isFile() && o.startsWith('.env.') && o !== '.env.example'
  )

await Promise.all(
  detectedEnvRegions.map(async envFile => {
    let region = envFile.replace('.env.', '')

    console.log(`building ${region} region...`)
    await spawnPromise([
      'bunx',
      '--bun',
      'vite',
      'build',
      '--mode',
      region,
      '--outDir',
      `dist-${region}`,
    ])
    console.log(`built ${region}!`)
  })
)
