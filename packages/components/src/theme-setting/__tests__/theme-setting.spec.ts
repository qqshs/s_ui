import { describe, it, expect, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { ShsThemeSetting } from '../index'

const rootStyle = () => document.documentElement.style

describe('ShsThemeSetting', () => {
  beforeEach(() => {
    rootStyle().removeProperty('--shs-color-primary')
    rootStyle().removeProperty('--shs-color-primary-hover')
    rootStyle().removeProperty('--shs-color-primary-active')
    document.body.innerHTML = ''
  })

  it('渲染齿轮触发按钮', () => {
    const wrapper = mount(ShsThemeSetting)
    const trigger = wrapper.find('.shs-theme-setting__trigger')
    expect(trigger.exists()).toBe(true)
    expect(trigger.find('.shs-icon').exists()).toBe(true)
    wrapper.unmount()
  })

  it('点击触发按钮发出打开面板请求（更新 modelValue）', async () => {
    const wrapper = mount(ShsThemeSetting)
    await wrapper.find('.shs-theme-setting__trigger').trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
    wrapper.unmount()
  })

  it('modelValue 为 true 时渲染面板', async () => {
    const wrapper = mount(ShsThemeSetting, { props: { modelValue: true } })
    await nextTick()
    await nextTick()
    expect(document.querySelector('.shs-modal')).toBeTruthy()
    wrapper.unmount()
  })

  it('选择色块实时预览主色（写入根节点 CSS 变量）', async () => {
    const wrapper = mount(ShsThemeSetting, { props: { modelValue: true } })
    await nextTick()
    const swatches = document.querySelectorAll('.shs-theme-setting__swatch')
    const target = swatches[3] as HTMLElement
    ;(target as HTMLElement).click()
    await nextTick()
    expect(rootStyle().getPropertyValue('--shs-color-primary').trim()).toBe('#8b5cf6')
    expect(rootStyle().getPropertyValue('--shs-color-primary-hover').trim()).not.toBe('')
    wrapper.unmount()
  })

  it('点击确定提交主题色并关闭面板', async () => {
    const wrapper = mount(ShsThemeSetting, { props: { modelValue: true } })
    await nextTick()
    const swatches = document.querySelectorAll('.shs-theme-setting__swatch')
    ;(swatches[3] as HTMLElement).click()
    await nextTick()
    const confirmBtn = document.querySelector(
      '.shs-modal__footer .shs-button--primary'
    ) as HTMLElement
    ;(confirmBtn as HTMLElement).click()
    await nextTick()
    expect(wrapper.emitted('apply')![0]).toEqual(['#8b5cf6'])
    expect(wrapper.emitted('update:modelValue')![1]).toEqual([false])
    expect(rootStyle().getPropertyValue('--shs-color-primary').trim()).toBe('#8b5cf6')
    wrapper.unmount()
  })

  it('点击取消还原未确认的预览', async () => {
    const wrapper = mount(ShsThemeSetting, {
      props: { modelValue: true, primaryColor: '#3b82f6' },
    })
    await nextTick()
    const swatches = document.querySelectorAll('.shs-theme-setting__swatch')
    ;(swatches[1] as HTMLElement).click()
    await nextTick()
    expect(rootStyle().getPropertyValue('--shs-color-primary').trim()).toBe('#2563eb')
    const cancelBtn = document.querySelector(
      '.shs-modal__footer .shs-button:not(.shs-button--primary)'
    ) as HTMLElement
    ;(cancelBtn as HTMLElement).click()
    await nextTick()
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(rootStyle().getPropertyValue('--shs-color-primary').trim()).toBe('#3b82f6')
    wrapper.unmount()
  })
})
