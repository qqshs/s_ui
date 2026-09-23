import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ShsUI from '@shs-ui/components'
import '@shs-ui/theme'
import '@shs-ui/components/style'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ShsUI)
  },
} satisfies Theme
