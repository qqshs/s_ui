import type { App, Plugin } from 'vue'
import { ShsButton } from './button'
import { ShsIcon } from './icon'
import { ShsTag } from './tag'
import { ShsCard } from './card'
import { ShsInput } from './input'
import { ShsRow } from './row'
import { ShsCol } from './col'
import { ShsSelect } from './select'
import { ShsForm, ShsFormItem } from './form'
import { ShsModal } from './modal'
import { ShsMessage, message } from './message'
import { ShsTable } from './table'
import { ShsPagination } from './pagination'
import { ShsMenu } from './menu'

// M2 全部 13 组件：Button Icon Tag Input Form Select Modal Message Table Pagination Card Layout Menu
const components: Plugin[] = [
  ShsButton,
  ShsIcon,
  ShsTag,
  ShsCard,
  ShsInput,
  ShsRow,
  ShsCol,
  ShsSelect,
  ShsForm,
  ShsFormItem,
  ShsModal,
  ShsMessage,
  ShsTable,
  ShsPagination,
  ShsMenu,
]

export const install = (app: App) => {
  components.forEach((c) => app.use(c))
}

export default {
  install,
  version: '0.0.1',
}

export {
  ShsButton,
  ShsIcon,
  ShsTag,
  ShsCard,
  ShsInput,
  ShsRow,
  ShsCol,
  ShsSelect,
  ShsForm,
  ShsFormItem,
  ShsModal,
  ShsMessage,
  message,
  ShsTable,
  ShsPagination,
  ShsMenu,
}
export * from './button/props'
export * from './icon/props'
export * from './tag/props'
export * from './card/props'
export * from './input/props'
export * from './row/props'
export * from './col/props'
export * from './select/props'
export * from './form/props'
export * from './form/form-item/props'
export * from './form/types'
export * from './modal/props'
export * from './message/props'
export * from './table/props'
export * from './pagination/props'
export * from './menu/props'
