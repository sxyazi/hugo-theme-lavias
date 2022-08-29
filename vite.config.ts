import {defineConfig} from 'vite'
import preact from '@preact/preset-vite'
import {resolve} from 'node:path'

export default defineConfig({
  plugins: [preact()],
  esbuild: {
    legalComments: 'none',
  },
  resolve: {
    alias: {
      '/src': resolve(__dirname, 'src'),
    },
  },
  build: {
    emptyOutDir: false,
    outDir: resolve(__dirname, 'static'),
  },
})
