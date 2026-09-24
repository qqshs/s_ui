import type { PropType } from 'vue'
import type { IconName } from '@shs-ui/icons'

export type EmptySize = 'small' | 'medium' | 'large'

export const emptyProps = {
  /** 描述文字 */
  description: {
    type: String,
    default: '暂无数据',
  },
  /** 图标名（来自 @shs-ui/icons），不传则使用内置空状态图形 */
  icon: {
    type: String as PropType<IconName>,
    default: undefined,
  },
  /** 自定义图片地址（优先于 icon 与内置图形） */
  image: {
    type: String,
    default: '',
  },
  /** 尺寸 */
  size: {
    type: String as PropType<EmptySize>,
    default: 'medium',
  },
} as const

export type EmptyProps = typeof emptyProps
