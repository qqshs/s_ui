import type { PropType } from 'vue'

export const watermarkProps = {
  /** 文字水印内容：字符串为单行，数组为多行（与 image 二选一，image 优先） */
  content: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  /** 图片水印地址（优先于文字内容） */
  image: {
    type: String,
    default: '',
  },
  /** 文字字号 */
  fontSize: {
    type: Number,
    default: 14,
  },
  /** 字体系列 */
  fontFamily: {
    type: String,
    default: 'sans-serif',
  },
  /** 字重 */
  fontWeight: {
    type: [Number, String] as PropType<number | string>,
    default: 400,
  },
  /** 文字颜色 */
  color: {
    type: String,
    default: 'rgba(0, 0, 0, 0.15)',
  },
  /** 旋转角度（度） */
  rotate: {
    type: Number,
    default: -22,
  },
  /** 水印单元横向间距 */
  gapX: {
    type: Number,
    default: 100,
  },
  /** 水印单元纵向间距 */
  gapY: {
    type: Number,
    default: 100,
  },
  /** 水印单元横向偏移 */
  offsetLeft: {
    type: Number,
    default: undefined,
  },
  /** 水印单元纵向偏移 */
  offsetTop: {
    type: Number,
    default: undefined,
  },
  /** 单个水印单元宽度（不传则按内容自动计算） */
  width: {
    type: Number,
    default: undefined,
  },
  /** 单个水印单元高度（不传则按内容自动计算） */
  height: {
    type: Number,
    default: undefined,
  },
  /** 水印整体透明度 */
  opacity: {
    type: Number,
    default: 1,
  },
  /** 层级 */
  zIndex: {
    type: Number,
    default: 9,
  },
  /** 是否全屏铺满（默认跟随容器尺寸） */
  fullScreen: {
    type: Boolean,
    default: false,
  },
} as const

export type WatermarkProps = typeof watermarkProps
