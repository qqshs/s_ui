export interface FormRule {
  /** 是否必填（空值判定：undefined / null / ''） */
  required?: boolean
  /** 校验失败提示文案 */
  message?: string
  /** 正则校验（仅对字符串） */
  pattern?: RegExp
  /** 字符串最小长度 */
  min?: number
  /** 字符串最大长度 */
  max?: number
  /** 自定义校验器 */
  validator?: (value: unknown, model: Record<string, unknown>) => boolean | Promise<boolean>
}

export type FormRules = Record<string, FormRule | FormRule[]>

export interface FormItemContext {
  model: Record<string, unknown>
  rules: FormRules
  registerField: (field: { prop: string; validate: () => Promise<boolean> }) => void
  unregisterField: (prop: string) => void
}
