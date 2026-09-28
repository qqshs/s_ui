import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: { api: 'modern' },
    },
  },
  resolve: {
    alias: {
      '@shs-ui/components': resolve(__dirname, '../components/src/index.ts'),
      '@shs-ui/icons': resolve(__dirname, '../icons/src/index.ts'),
      '@shs-ui/utils': resolve(__dirname, '../utils/src/index.ts'),
      '@shs-ui/theme': resolve(__dirname, '../theme/src/index.scss'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'S_UI',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.umd.cjs'),
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        exports: 'named',
      },
    },
  },
})
