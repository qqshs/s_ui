import type { PropType } from 'vue'

export type MessageType = 'success' | 'error' | 'warning' | 'info'

export const messageProps = {
  /** 消息类型 */
  type: {
    type: String as PropType<MessageType>,
    default: 'info',
  },
  /** 消息内容 */
  content: {
    type: String,
    default: '',
  },
  /** 展示时长（ms），0 表示不自动关闭 */
  duration: {
    type: Number,
    default: 3000,
  },
} as const

export type MessageProps = typeof messageProps
