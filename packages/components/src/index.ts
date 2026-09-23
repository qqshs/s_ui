import type { App, Plugin } from 'vue'
import { ShsButton } from './button'
import { ShsIcon } from './icon'
import { ShsTag } from './tag'
import { ShsCard } from './card'
import { ShsInput } from './input'
import { ShsRow } from './row'
import { ShsCol } from './col'

// M2 将陆续登记全部 13 个组件：Button Icon Tag Input Form Select Modal Message Table Pagination Card Layout Menu
const components: Plugin[] = [ShsButton, ShsIcon, ShsTag, ShsCard, ShsInput, ShsRow, ShsCol]

export const install = (app: App) => {
  components.forEach((c) => app.use(c))
}

export default {
  install,
  version: '0.0.1',
}

export { ShsButton, ShsIcon, ShsTag, ShsCard, ShsInput, ShsRow, ShsCol }
export * from './button/props'
export * from './icon/props'
export * from './tag/props'
export * from './card/props'
export * from './input/props'
export * from './row/props'
export * from './col/props'
