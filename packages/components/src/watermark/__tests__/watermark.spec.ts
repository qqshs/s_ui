import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { ShsWatermark } from '../index'

/** 最小可用的 2D context mock */
function createCtxMock() {
  return {
    font: '',
    fillStyle: '',
    textAlign: '',
    textBaseline: '',
    globalAlpha: 1,
    measureText: vi.fn(() => ({ width: 60 })),
    fillText: vi.fn(),
    drawImage: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
  } as unknown as CanvasRenderingContext2D
}

let ctxMock: ReturnType<typeof createCtxMock>
let toDataURLSpy: MockInstance

beforeEach(() => {
  ctxMock = createCtxMock()
  vi.stubGlobal(
    'Image',
    class {
      src = ''
      onload: (() => void) | null = null
      onerror: (() => void) | null = null
      constructor() {
        queueMicrotask(() => this.onload?.())
      }
    }
  )
  // jsdom 默认不支持 canvas 2d，直接 mock 原型方法
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
    ctxMock as unknown as CanvasRenderingContext2D
  )
  toDataURLSpy = vi
    .spyOn(HTMLCanvasElement.prototype, 'toDataURL')
    .mockReturnValue('data:image/png;base64,watermark')
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('ShsWatermark', () => {
  it('无内容时不渲染遮罩层', () => {
    const wrapper = mount(ShsWatermark, {
      props: { content: '' },
      slots: { default: '<div class="demo">内容</div>' },
    })
    expect(wrapper.find('.shs-watermark__mask').exists()).toBe(false)
    expect(wrapper.find('.demo').text()).toBe('内容')
  })

  it('渲染文字水印并生成背景图', async () => {
    const wrapper = mount(ShsWatermark, { props: { content: '机密文件' } })
    await flushPromises()
    const mask = wrapper.find('.shs-watermark__mask')
    expect(mask.exists()).toBe(true)
    expect(toDataURLSpy).toHaveBeenCalled()
    expect(mask.attributes('style')).toContain('data:image/png;base64,watermark')
    expect(ctxMock.fillText).toHaveBeenCalledWith('机密文件', 0, 0)
  })

  it('多行文字逐行绘制', async () => {
    const wrapper = mount(ShsWatermark, {
      props: { content: ['第一行', '第二行'] },
    })
    await flushPromises()
    expect(ctxMock.fillText).toHaveBeenCalledTimes(2)
  })

  it('fullScreen 时挂 fullscreen class', () => {
    const wrapper = mount(ShsWatermark, {
      props: { content: 'x', fullScreen: true },
    })
    expect(wrapper.classes()).toContain('shs-watermark--fullscreen')
  })

  it('图片水印优先于文字并调用 drawImage', async () => {
    const wrapper = mount(ShsWatermark, {
      props: { content: '文字', image: 'https://example.com/mark.png' },
    })
    await flushPromises()
    expect(ctxMock.drawImage).toHaveBeenCalled()
  })

  it('prop 变更后重新绘制', async () => {
    const wrapper = mount(ShsWatermark, { props: { content: '旧' } })
    await flushPromises()
    const before = toDataURLSpy.mock.calls.length
    await wrapper.setProps({ content: '新' })
    await flushPromises()
    expect(toDataURLSpy.mock.calls.length).toBeGreaterThan(before)
  })
})
