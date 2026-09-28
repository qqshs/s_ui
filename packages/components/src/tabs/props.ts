import type { PropType } from 'vue'

export interface TabItem {
  /** 唯一标识 */
  name: string
  /** 显示文本 */
  label: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否可关闭（优先级高于 tabs 级 closable） */
  closable?: boolean
}

export type TabsType = 'line' | 'card' | 'folder' | 'tags'

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
  /** 样式类型：line 下划线 / card 卡片 / folder 文件夹 / tags 多页签（tags-view） */
  type: {
    type: String as PropType<TabsType>,
    default: 'line',
  },
  /** 是否显示关闭按钮（可被单个 tab 的 closable 覆盖） */
  closable: {
    type: Boolean,
    default: false,
  },
} as const

export type TabsProps = typeof tabsProps
