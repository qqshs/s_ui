import type { PropType } from 'vue'

export interface SelectOption {
  /** 显示文本 */
  label: string
  /** 绑定值 */
  value: string | number
  /** 是否禁用该选项 */
  disabled?: boolean
}

export type SelectSize = 'small' | 'medium' | 'large'

export const selectProps = {
  /** 选中值（v-model） */
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  /** 选项列表 */
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => [],
  },
  /** 占位文本 */
  placeholder: {
    type: String,
    default: '请选择',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否可清空 */
  clearable: {
    type: Boolean,
    default: false,
  },
  /** 尺寸 */
  size: {
    type: String as PropType<SelectSize>,
    default: 'medium',
  },
} as const

export type SelectProps = typeof selectProps
