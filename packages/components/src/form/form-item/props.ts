export const formItemProps = {
  /** 字段标签 */
  label: {
    type: String,
    default: '',
  },
  /** 对应的 model 字段名（用于定位校验规则） */
  prop: {
    type: String,
    default: '',
  },
} as const

export type FormItemProps = typeof formItemProps
