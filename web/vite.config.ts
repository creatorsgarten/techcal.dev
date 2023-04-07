import path from 'path'
import { defineConfig, loadEnv } from 'vite'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import tsPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'

import type { UserConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      svelte(),
      tsPaths(),
      VitePWA({
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
      // @ts-ignore
      ...(process.env.ANALYZE === 'true'
        ? [
            visualizer({
              open: true,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '$selectedLang': path.resolve(__dirname, './src/locale/lang', `${env.VITE_LOCALE}.ts`)
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            dayjs: ['dayjs'],
          },
        },
      },
    },
  } as UserConfig
})
