import type { PropType } from 'vue'

export type CheckboxValue = string | number | boolean

export const checkboxProps = {
  /** 选中态（v-model，独立使用时） */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /** 选项值（在 CheckboxGroup 中生效） */
  value: {
    type: [String, Number, Boolean] as PropType<CheckboxValue>,
    default: undefined,
  },
  /** 显示文本 */
  label: {
    type: String,
    default: '',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const

export const checkboxGroupProps = {
  /** 选中值数组（v-model） */
  modelValue: {
    type: Array as PropType<CheckboxValue[]>,
    default: () => [],
  },
  /** 是否整体禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const

export type CheckboxProps = typeof checkboxProps
export type CheckboxGroupProps = typeof checkboxGroupProps
