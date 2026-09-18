import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// MendixGo — installable PWA (Duolingo-style Mendix study app)
// https://vitejs.dev/config/
export default defineConfig({
  base: './', // relative base so it hosts on any static path (GitHub Pages/Netlify subpaths)
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'MendixGo — Learn Mendix daily',
        short_name: 'MendixGo',
        description: 'Duolingo-style Mendix study: interview prep, Cortex course, exam prep. Streaks, XP, spaced repetition.',
        theme_color: '#58cc02',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // the whole app is static + local data → cache everything for full offline use
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: 'index.html',
      },
      devOptions: { enabled: false },
    }),
  ],
  server: { port: 5181, open: true },
})
