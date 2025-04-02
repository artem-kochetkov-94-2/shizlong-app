import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa'
import svgr from "@svgr/rollup";
import path from 'path'

const manifest: Partial<ManifestOptions> | false = {
  name: 'Шезлонгер',
  short_name: 'Шезлонгер',
  start_url: '/',
  display: 'standalone',
  theme_color: '#8936FF',
  background_color: '#2EC6FE',
  icons: [
    {
      purpose: 'maskable',
      sizes: '512x512',
      src: 'icon512_maskable.png',
      type: 'image/png'
    },
    {
      purpose: 'any',
      sizes: '512x512',
      src: 'icon512_rounded.png',
      type: 'image/png'
    }
  ],
}

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
    manifest: manifest,
  })],
  server: {
    port: 3000,
  },
  define: {
    'process.env': process.env
  }
});
