import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsRadio } from '../index'

describe('ShsRadio', () => {
  it('独立使用时根据 modelValue 渲染选中态', () => {
    const wrapper = mount(ShsRadio, { props: { value: 'a', modelValue: 'a' } })
    expect(wrapper.classes()).toContain('is-checked')
  })

  it('点击触发 update:modelValue 与 change', async () => {
    const wrapper = mount(ShsRadio, { props: { value: 'a', modelValue: '' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('a')
    expect(wrapper.emitted('change')![0][0]).toBe('a')
  })

  it('渲染 label 文本', () => {
    const wrapper = mount(ShsRadio, { props: { value: 'a', label: '选项A' } })
    expect(wrapper.text()).toContain('选项A')
  })

  it('disabled 时不触发事件', async () => {
    const wrapper = mount(ShsRadio, { props: { value: 'a', modelValue: '', disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
