import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

const appRoot = __dirname
const repoRoot = path.resolve(__dirname, '../..')
const sharedRoot = path.resolve(repoRoot, 'shared')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(appRoot, './src'),
      '@shared': sharedRoot,
    },
  },
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
})
