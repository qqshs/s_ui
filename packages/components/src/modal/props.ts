export const modalProps = {
  /** 是否显示（v-model） */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /** 标题（也可用 title 插槽） */
  title: {
    type: String,
    default: '',
  },
  /** 弹窗宽度 */
  width: {
    type: String,
    default: '520px',
  },
  /** 是否显示底部按钮区 */
  showFooter: {
    type: Boolean,
    default: true,
  },
  /** 确认按钮文案 */
  confirmText: {
    type: String,
    default: '确定',
  },
  /** 取消按钮文案 */
  cancelText: {
    type: String,
    default: '取消',
  },
  /** 点击遮罩是否关闭 */
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
} as const

export type ModalProps = typeof modalProps
