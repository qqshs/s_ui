import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@shs-ui/components': resolve(__dirname, 'packages/components/src/index.ts'),
      '@shs-ui/icons': resolve(__dirname, 'packages/icons/src/index.ts'),
      '@shs-ui/utils': resolve(__dirname, 'packages/utils/src/index.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['packages/**/__tests__/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['packages/components/src/**/*.{vue,ts}'],
    },
  },
})
