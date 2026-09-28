/** 预设主题色：可快速点选的一组主色 */
export const DEFAULT_THEME_COLORS = [
  '#3b82f6', // 蓝（默认）
  '#2563eb',
  '#6366f1', // 靛蓝
  '#8b5cf6', // 紫
  '#ec4899', // 粉
  '#ef4444', // 红
  '#f97316', // 桔
  '#22c55e', // 绿
  '#06b6d4', // 青
] as const

export const themeSettingProps = {
  /** 是否显示面板（v-model） */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /** 面板标题 */
  title: {
    type: String,
    default: '主题设置',
  },
  /** 面板宽度 */
  width: {
    type: String,
    default: '420px',
  },
  /** 预设主题色 */
  presetColors: {
    type: Array as () => string[],
    default: () => [...DEFAULT_THEME_COLORS],
  },
  /** 当前主题主色（用于回显与取消时还原） */
  primaryColor: {
    type: String,
    default: '#3b82f6',
  },
  /** 确认按钮文案 */
  confirmText: {
    type: String,
    default: '确定',
  },
  /** 取消按钮文案 */
  cancelText: {
    type: String,
    default: '取消',
  },
  /** 确认后是否关闭面板 */
  closeOnConfirm: {
    type: Boolean,
    default: true,
  },
} as const

export type ThemeSettingProps = typeof themeSettingProps
