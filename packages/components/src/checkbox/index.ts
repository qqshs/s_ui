import Checkbox from './checkbox.vue'
import CheckboxGroup from './checkbox-group.vue'
import { withInstall } from '../utils/with-install'

export const ShsCheckbox = withInstall(Checkbox)
export const ShsCheckboxGroup = withInstall(CheckboxGroup)
export * from './props'
export * from './types'
