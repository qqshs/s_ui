import type { PropType } from 'vue'

export const asideProps = {
  /** 侧边栏宽度，可传数字（px）或带单位的字符串 */
  width: {
    type: [Number, String] as PropType<number | string>,
    default: 200,
  },
} as const

export type AsideProps = typeof asideProps
