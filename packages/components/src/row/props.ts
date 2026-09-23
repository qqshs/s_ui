import type { PropType } from 'vue'

export type RowJustify = 'start' | 'end' | 'center' | 'space-between' | 'space-around'
export type RowAlign = 'top' | 'middle' | 'bottom'

export const rowProps = {
  /** 栅格间隔（px），向左右平均分配负边距 */
  gutter: {
    type: Number,
    default: 0,
  },
  /** 水平排列方式 */
  justify: {
    type: String as PropType<RowJustify>,
    default: 'start',
  },
  /** 垂直对齐方式 */
  align: {
    type: String as PropType<RowAlign>,
    default: 'top',
  },
} as const

export type RowProps = typeof rowProps
