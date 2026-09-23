import type { RadioValue } from './props'

export interface RadioGroupContext {
  modelValue: RadioValue
  disabled: boolean
  name: string
  onChange: (value: RadioValue) => void
}
