import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { ShsModal } from '../index'

describe('ShsModal', () => {
  it('modelValue 为 false 时不渲染', () => {
    mount(ShsModal, { props: { modelValue: false } })
    expect(document.querySelector('.shs-modal')).toBeNull()
  })

  it('modelValue 为 true 时渲染到 body 并显示标题', async () => {
    const wrapper = mount(ShsModal, { props: { modelValue: true, title: '提示' } })
    await nextTick()
    const el = document.querySelector('.shs-modal')
    expect(el).toBeTruthy()
    expect(el!.querySelector('.shs-modal__title')!.textContent).toContain('提示')
    wrapper.unmount()
  })

  it('点击确认触发 confirm 并关闭', async () => {
    const wrapper = mount(ShsModal, { props: { modelValue: true } })
    await nextTick()
    const confirmBtn = document.querySelector('.shs-modal__footer .shs-button--primary')!
    ;(confirmBtn as HTMLElement).click()
    await nextTick()
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
    wrapper.unmount()
  })

  it('点击遮罩关闭（默认 closeOnClickModal）', async () => {
    const wrapper = mount(ShsModal, { props: { modelValue: true } })
    await nextTick()
    const mask = document.querySelector('.shs-modal')!
    ;(mask as HTMLElement).click()
    await nextTick()
    expect(wrapper.emitted('close')).toHaveLength(1)
    wrapper.unmount()
  })
})
