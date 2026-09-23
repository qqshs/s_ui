import type { CheckboxValue } from './props'

export interface CheckboxGroupContext {
  modelValue: CheckboxValue[]
  disabled: boolean
  toggle: (value: CheckboxValue) => void
}
