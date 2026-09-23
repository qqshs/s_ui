import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsInput } from '../index'

describe('ShsInput', () => {
  it('渲染 input 并绑定初始值', () => {
    const wrapper = mount(ShsInput, { props: { modelValue: 'hello' } })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('hello')
  })

  it('输入时触发 update:modelValue', async () => {
    const wrapper = mount(ShsInput, { props: { modelValue: '' } })
    const input = wrapper.find('input')
    await input.setValue('shs')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['shs'])
  })

  it('clearable 且有值时显示清空按钮并触发 clear', async () => {
    const wrapper = mount(ShsInput, { props: { modelValue: '内容', clearable: true } })
    const clear = wrapper.find('.shs-input__clear')
    expect(clear.exists()).toBe(true)
    await clear.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('disabled 时禁用输入框', () => {
    const wrapper = mount(ShsInput, { props: { disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })
})
