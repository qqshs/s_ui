import type { PropType } from 'vue'

export interface UploadFile {
  /** 文件标识 */
  uid: string
  /** 文件名 */
  name: string
  /** 大小（字节） */
  size: number
  /** 原生 File 引用 */
  raw?: File
  /** 状态 */
  status?: 'ready' | 'uploading' | 'done' | 'error'
  /** 本地预览地址（图片） */
  url?: string
}

export type UploadListType = 'text' | 'picture'

export const uploadProps = {
  /** 已上传文件列表（v-model） */
  modelValue: {
    type: Array as PropType<UploadFile[]>,
    default: () => [],
  },
  /** 是否支持多选 */
  multiple: {
    type: Boolean,
    default: false,
  },
  /** 接受的文件类型（input accept） */
  accept: {
    type: String,
    default: '',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 触发区提示文字 */
  tip: {
    type: String,
    default: '点击或拖拽文件到此处上传',
  },
  /** 列表样式 */
  listType: {
    type: String as PropType<UploadListType>,
    default: 'text',
  },
} as const

export type UploadProps = typeof uploadProps
