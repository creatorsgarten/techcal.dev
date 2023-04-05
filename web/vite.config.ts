import { defineConfig } from 'vite'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import tsPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    tsPaths(),
    ...(process.env.ANALYZE === 'true'
      ? [
          visualizer({
            open: true,
          }),
        ]
      : []),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          dayjs: ['dayjs'],
        },
      },
    },
  },
})
