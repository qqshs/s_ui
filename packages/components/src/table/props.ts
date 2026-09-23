import type { PropType } from 'vue'

export interface TableColumn {
  /** 列标题 */
  label: string
  /** 对应数据字段 */
  prop: string
  /** 列宽度 */
  width?: string
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
}

export const tableProps = {
  /** 列定义 */
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => [],
  },
  /** 表格数据 */
  data: {
    type: Array as PropType<Record<string, unknown>[]>,
    default: () => [],
  },
  /** 是否显示边框 */
  border: {
    type: Boolean,
    default: false,
  },
  /** 是否斑马纹 */
  striped: {
    type: Boolean,
    default: false,
  },
} as const

export type TableProps = typeof tableProps
