import type { PropType } from 'vue'

export interface TreeNode {
  /** 节点唯一标识（缺省时用 label） */
  value?: string
  /** 显示文本 */
  label: string
  /** 子节点 */
  children?: TreeNode[]
  /** 是否禁用 */
  disabled?: boolean
}

export const treeProps = {
  /** 树数据 */
  data: {
    type: Array as PropType<TreeNode[]>,
    default: () => [],
  },
  /** 当前选中节点标识（v-model） */
  modelValue: {
    type: String,
    default: '',
  },
  /** 是否默认展开所有有子节点的项 */
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
} as const

export type TreeProps = typeof treeProps
