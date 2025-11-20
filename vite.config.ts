import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const require = createRequire(import.meta.url)
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true'
const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const hasFirebaseDeps = (() => {
    try {
      require.resolve('firebase/app')
      return true
    } catch {
      return false
    }
  })()

  const hasFirebaseKeys = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ].every((key) => Boolean(env[key]))

  const allowStub = env.VITE_ENABLE_FIREBASE_STUB !== 'false'
  const useStubAliases = allowStub && (!hasFirebaseDeps || !hasFirebaseKeys)

  const firebaseStubAliases = useStubAliases
    ? {
        'firebase/app': resolve(__dirname, './src/stubs/firebase/app.ts'),
        'firebase/firestore': resolve(__dirname, './src/stubs/firebase/firestore.ts'),
        'firebase/storage': resolve(__dirname, './src/stubs/firebase/storage.ts')
      }
    : {}

  return {
    base: isVercel ? '/' : '/aimediac1/',
    plugins: [
      react(),
      tsconfigPaths(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Islam Media Central',
          short_name: 'IMC',
          description: 'Your comprehensive Islamic digital hub',
          theme_color: '#0284c7',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ],
          categories: ['religion', 'education', 'lifestyle'],
          screenshots: [
            {
              src: 'screenshot-desktop.png',
              sizes: '1280x720',
              type: 'image/png',
              form_factor: 'wide',
              label: 'Desktop view'
            },
            {
              src: 'screenshot-mobile.png',
              sizes: '390x844',
              type: 'image/png',
              form_factor: 'narrow',
              label: 'Mobile view'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/a4\.asurahosting\.com\/.*$/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'radio-stream-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 // 1 hour
                }
              }
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        ...firebaseStubAliases
      }
    },
    server: {
      port: 3000,
      host: true
    }
  }
})
