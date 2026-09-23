import type { PropType } from 'vue'

export interface MenuItem {
  /** 菜单标题 */
  label: string
  /** 唯一标识 */
  key: string
  /** 是否禁用 */
  disabled?: boolean
  /** 子菜单 */
  children?: MenuItem[]
}

export const menuProps = {
  /** 菜单数据 */
  items: {
    type: Array as PropType<MenuItem[]>,
    default: () => [],
  },
  /** 布局方向 */
  mode: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical',
  },
  /** 默认激活项 key */
  defaultActive: {
    type: String,
    default: '',
  },
} as const

export type MenuProps = typeof menuProps
