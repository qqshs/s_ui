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

// M2 组件：Button Icon Tag Input Form Select Modal Message Table Pagination Card Layout Menu
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
