import Form from './form.vue'
import FormItem from './form-item.vue'
import { withInstall } from '../utils/with-install'

export const ShsForm = withInstall(Form)
export const ShsFormItem = withInstall(FormItem)
export * from './props'
export * from './form-item/props'
export * from './types'
