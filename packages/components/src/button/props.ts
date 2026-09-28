import type { PropType } from 'vue'

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonRadius = 'none' | 'small' | 'medium' | 'large'

export const buttonProps = {
  /** 按钮类型 */
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
  },
  /** 尺寸 */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 原生 button 类型 */
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  /** 是否加载中（加载时禁用并显示图标） */
  loading: {
    type: Boolean,
    default: false,
  },
  /** 四角圆角弧度：预设 none/small/medium/large，或传入数字作为像素值（round 优先） */
  radius: {
    type: [String, Number] as PropType<ButtonRadius | number>,
    default: 'medium',
  },
  /** 是否为圆角按钮 */
  round: {
    type: Boolean,
    default: false,
  },
} as const

export type ButtonProps = typeof buttonProps
