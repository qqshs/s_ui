export const dateTimePickerProps = {
  /** 选中日期时间（v-model，格式 YYYY-MM-DD HH:mm） */
  modelValue: {
    type: String,
    default: '',
  },
  /** 占位文本 */
  placeholder: {
    type: String,
    default: '请选择日期时间',
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
} as const

export type DateTimePickerProps = typeof dateTimePickerProps
