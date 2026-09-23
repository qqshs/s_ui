export const formProps = {
  /** 表单数据对象（必须响应式） */
  model: {
    type: Object as () => Record<string, unknown>,
    required: true,
  },
  /** 校验规则 */
  rules: {
    type: Object as () => Record<string, unknown>,
    default: () => ({}),
  },
  /** 统一标签宽度（如 '80px'） */
  labelWidth: {
    type: String,
    default: '',
  },
} as const

export type FormProps = typeof formProps
