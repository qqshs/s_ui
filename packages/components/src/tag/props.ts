import type { PropType } from 'vue'

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type TagSize = 'small' | 'medium'

export const tagProps = {
  /** 标签类型（决定颜色） */
  type: {
    type: String as PropType<TagType>,
    default: 'default',
  },
  /** 尺寸 */
  size: {
    type: String as PropType<TagSize>,
    default: 'medium',
  },
  /** 是否可关闭 */
  closable: {
    type: Boolean,
    default: false,
  },
  /** 是否禁用（禁用时不可关闭） */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const

export type TagProps = typeof tagProps
