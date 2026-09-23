import type { App, Plugin } from 'vue'
import { ShsButton } from './button'

// M2 将在此登记全部 13 个组件：Button Icon Tag Input Form Select Modal Message Table Pagination Card Layout Menu
const components: Plugin[] = [ShsButton]

export const install = (app: App) => {
  components.forEach((c) => app.use(c))
}

export default {
  install,
  version: '0.0.1',
}

export { ShsButton }
export * from './button/props'
