export const paginationProps = {
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
} as const

export type PaginationProps = typeof paginationProps
