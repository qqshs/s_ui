import type { PropType } from 'vue'

export type RadioValue = string | number | boolean

export const radioProps = {
  /** 当前选中值（v-model，独立使用时） */
  modelValue: {
    type: [String, Number, Boolean] as PropType<RadioValue>,
    default: undefined,
  },
  /** 选项值 */
  value: {
    type: [String, Number, Boolean] as PropType<RadioValue>,
    required: true,
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
  /** 原生 name 属性 */
  name: {
    type: String,
    default: '',
  },
} as const

export const radioGroupProps = {
  /** 当前选中值（v-model） */
  modelValue: {
    type: [String, Number, Boolean] as PropType<RadioValue>,
    default: '',
  },
  /** 是否整体禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
} as const

export type RadioProps = typeof radioProps
export type RadioGroupProps = typeof radioGroupProps
