import type { PropType } from 'vue'

export type ProFieldType = 'input' | 'textarea' | 'select' | 'number'

export interface ProField {
  /** 字段名 */
  prop: string
  /** 标签 */
  label: string
  /** 控件类型 */
  type?: ProFieldType
  /** 占位符 */
  placeholder?: string
  /** select 选项 */
  options?: { label: string; value: string | number }[]
  /** 是否必填 */
  required?: boolean
  /** 默认值 */
  initialValue?: string | number
}

export const proFormProps = {
  /** 表单字段 schema */
  fields: {
    type: Array as PropType<ProField[]>,
    default: () => [],
  },
  /** 表单数据（v-model，可选，用于初始化与同步） */
  modelValue: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({}),
  },
  /** 标签宽度 */
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 提交按钮文字 */
  submitText: {
    type: String,
    default: '提交',
  },
  /** 是否显示重置按钮 */
  showReset: {
    type: Boolean,
    default: true,
  },
} as const

export type ProFormProps = typeof proFormProps
