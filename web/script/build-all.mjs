import 'zx/globals'

$.verbose = false

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

    echo`building ${region} region...`
    await $`pnpm vite build --mode ${region} --outDir dist-${region}`
    echo`built ${region}!`
  })
)
