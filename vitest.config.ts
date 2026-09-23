import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
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
