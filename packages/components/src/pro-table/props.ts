import type { PropType } from 'vue'
import type { TableColumn } from '../table/props'

export interface ProSearchField {
  /** 字段名 */
  prop: string
  /** 标签 */
  label: string
  /** 控件类型 */
  type?: 'input' | 'select'
  /** 占位符 */
  placeholder?: string
  /** select 选项 */
  options?: { label: string; value: string | number }[]
}

export const proTableProps = {
  /** 列定义 */
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => [],
  },
  /** 表格数据 */
  dataSource: {
    type: Array as PropType<Record<string, unknown>[]>,
    default: () => [],
  },
  /** 搜索区字段 */
  searchFields: {
    type: Array as PropType<ProSearchField[]>,
    default: () => [],
  },
  /** 是否显示搜索区 */
  showSearch: {
    type: Boolean,
    default: true,
  },
  /** 是否显示分页 */
  showPagination: {
    type: Boolean,
    default: true,
  },
  /** 当前页码（v-model:currentPage） */
  currentPage: {
    type: Number,
    default: 1,
  },
  /** 每页条数 */
  pageSize: {
    type: Number,
    default: 10,
  },
  /** 数据总条数 */
  total: {
    type: Number,
    default: 0,
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

export type ProTableProps = typeof proTableProps
