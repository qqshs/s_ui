import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: { api: 'modern' },
    },
  },
  resolve: {
    alias: {
      '@shs-ui/components': '@shs-ui/components',
    },
  },
})
