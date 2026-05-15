import { defineConfig } from 'vite'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA as pwa } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    svelte(),
    tailwindcss(),
    pwa({
      manifest: {
        short_name: 'techcal.dev',
        name: 'techcal.dev',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#111111',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    ...(process.env.ANALYZE === 'true'
      ? [
          visualizer({
            open: true,
          }),
        ]
      : []),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'dayjs',
              test: /node_modules\/dayjs/,
            },
          ],
        },
      },
    },
  },
})
