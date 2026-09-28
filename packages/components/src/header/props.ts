import type { PropType } from 'vue'

export const headerProps = {
  /** 顶栏高度，可传数字（px）或带单位的字符串 */
  height: {
    type: [Number, String] as PropType<number | string>,
    default: 60,
  },
} as const

export type HeaderProps = typeof headerProps
