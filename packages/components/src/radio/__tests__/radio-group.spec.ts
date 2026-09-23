import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { ShsRadio, ShsRadioGroup } from '../index'

const RadioA = () => h(ShsRadio, { value: 'a', label: 'A' })
const RadioB = () => h(ShsRadio, { value: 'b', label: 'B' })

describe('ShsRadioGroup', () => {
  it('渲染多个子项并按 modelValue 高亮', () => {
    const wrapper = mount(ShsRadioGroup, {
      props: { modelValue: 'b' },
      slots: { default: () => [RadioA(), RadioB()] },
    })
    const radios = wrapper.findAll('.shs-radio')
    expect(radios.length).toBe(2)
    expect(radios[1].classes()).toContain('is-checked')
  })

  it('点击子项触发 update:modelValue 与 change', async () => {
    const wrapper = mount(ShsRadioGroup, {
      props: { modelValue: 'a' },
      slots: { default: () => [RadioA(), RadioB()] },
    })
    await wrapper.findAll('.shs-radio')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('b')
    expect(wrapper.emitted('change')![0][0]).toBe('b')
  })

  it('整体 disabled 时子项不触发', async () => {
    const wrapper = mount(ShsRadioGroup, {
      props: { modelValue: 'a', disabled: true },
      slots: { default: () => [RadioA(), RadioB()] },
    })
    await wrapper.findAll('.shs-radio')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
