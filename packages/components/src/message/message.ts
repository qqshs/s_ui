import { createVNode, render } from 'vue'
import Message from './message.vue'
import type { MessageType } from './props'

export interface MessageOptions {
  content: string
  type?: MessageType
  duration?: number
}

let seed = 0

/** 创建一条命令式消息，挂载到 body，duration 后自动关闭 */
export function createMessage(options: MessageOptions) {
  const { content, type = 'info', duration = 3000 } = options
  const container = document.createElement('div')
  container.id = `shs-message-${seed++}`
  container.className = 'shs-message-wrapper'

  const close = () => {
    render(null, container)
    if (container.parentNode) container.parentNode.removeChild(container)
  }

  const vnode = createVNode(Message, {
    content,
    type,
    duration,
    onClose: close,
  })
  render(vnode, container)
  document.body.appendChild(container)

  return { el: container, close }
}

type MessageFn = (options: MessageOptions | string) => void

interface MessageApi extends MessageFn {
  success: (content: string, options?: Partial<Omit<MessageOptions, 'content' | 'type'>>) => void
  error: MessageApi['success']
  warning: MessageApi['success']
  info: MessageApi['success']
}

export const message: MessageApi = ((options: MessageOptions | string) => {
  createMessage(typeof options === 'string' ? { content: options } : options)
}) as MessageApi

message.success = (content, options) => createMessage({ ...options, content, type: 'success' })
message.error = (content, options) => createMessage({ ...options, content, type: 'error' })
message.warning = (content, options) => createMessage({ ...options, content, type: 'warning' })
message.info = (content, options) => createMessage({ ...options, content, type: 'info' })

export default message
