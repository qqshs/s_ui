import type { PropType } from 'vue'

export interface TabItem {
  /** 唯一标识 */
  name: string
  /** 显示文本 */
  label: string
  /** 是否禁用 */
  disabled?: boolean
}

export type TabsType = 'line' | 'card'

export const tabsProps = {
  /** 当前激活的 tab 名称（v-model） */
  modelValue: {
    type: String,
    default: '',
  },
  /** tab 项列表 */
  tabs: {
    type: Array as PropType<TabItem[]>,
    default: () => [],
  },
  /** 样式类型 */
  type: {
    type: String as PropType<TabsType>,
    default: 'line',
  },
} as const

export type TabsProps = typeof tabsProps
