import type { PropType } from 'vue'

export type CardShadow = 'never' | 'hover' | 'always'

export const cardProps = {
  /** 卡片标题（也可用 header 插槽） */
  title: {
    type: String,
    default: '',
  },
  /** 阴影显示时机 */
  shadow: {
    type: String as PropType<CardShadow>,
    default: 'always',
  },
} as const

export type CardProps = typeof cardProps
