// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'test',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    lib: {
      entry: '../src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js'
    },
    target: 'esnext',
    minify: false
  }
})
