import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from "@svgr/rollup";
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@presentation': path.resolve(__dirname, 'src/presentation'),
      '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
    },
  },
  plugins: [svgr(), react(), VitePWA({
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    manifest: {
      name: 'My PWA App',
      short_name: 'PWA App',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
    },
  })],
  server: {
    port: 3000,
  },
  define: {
    'process.env': process.env
  }
});
