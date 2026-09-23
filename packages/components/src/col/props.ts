export const colProps = {
  /** 栅格占据数（1~24） */
  span: {
    type: Number,
    default: 24,
  },
  /** 栅格左侧偏移数（1~24） */
  offset: {
    type: Number,
    default: 0,
  },
} as const

export type ColProps = typeof colProps
