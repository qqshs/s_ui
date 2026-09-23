import type { PropType } from 'vue'
import type { IconName } from '@shs-ui/icons'

export const iconProps = {
  /** 图标名称（见 @shs-ui/icons 图标清单） */
  name: {
    type: String as PropType<IconName>,
    required: true,
  },
  /** 尺寸，数字或带单位字符串 */
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 16,
  },
  /** 颜色，默认继承 currentColor */
  color: {
    type: String,
    default: 'currentColor',
  },
} as const

export type IconProps = typeof iconProps
