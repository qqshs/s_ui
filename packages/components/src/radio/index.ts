import Radio from './radio.vue'
import RadioGroup from './radio-group.vue'
import { withInstall } from '../utils/with-install'

export const ShsRadio = withInstall(Radio)
export const ShsRadioGroup = withInstall(RadioGroup)
export * from './props'
export * from './types'
