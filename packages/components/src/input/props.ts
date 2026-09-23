import type { PropType } from 'vue'

export type InputSize = 'small' | 'medium' | 'large'
export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel'

export const inputProps = {
  /** 绑定值（v-model） */
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  /** 输入框类型 */
  type: {
    type: String as PropType<InputType>,
    default: 'text',
  },
  /** 占位文本 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false,
  },
  /** 是否可一键清空 */
  clearable: {
    type: Boolean,
    default: false,
  },
  /** 尺寸 */
  size: {
    type: String as PropType<InputSize>,
    default: 'medium',
  },
} as const

export type InputProps = typeof inputProps
