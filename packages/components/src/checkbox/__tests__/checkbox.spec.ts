import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsCheckbox } from '../index'

describe('ShsCheckbox', () => {
  it('根据 modelValue 渲染选中态', () => {
    const wrapper = mount(ShsCheckbox, { props: { modelValue: true } })
    expect(wrapper.classes()).toContain('is-checked')
  })

  it('点击切换选中态并触发事件', async () => {
    const wrapper = mount(ShsCheckbox, { props: { modelValue: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(true)
    expect(wrapper.emitted('change')![0][0]).toBe(true)
  })

  it('渲染 label 文本', () => {
    const wrapper = mount(ShsCheckbox, { props: { label: '选项1' } })
    expect(wrapper.text()).toContain('选项1')
  })

  it('disabled 时不触发事件', async () => {
    const wrapper = mount(ShsCheckbox, { props: { modelValue: false, disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
