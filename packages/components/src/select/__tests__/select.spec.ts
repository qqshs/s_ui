import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { ShsSelect } from '../index'

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '西瓜', value: 'watermelon' },
]

describe('ShsSelect', () => {
  it('无选中值时显示占位符', () => {
    const wrapper = mount(ShsSelect, { props: { options, placeholder: '请选择水果' } })
    expect(wrapper.text()).toContain('请选择水果')
  })

  it('点击展开下拉并渲染选项', async () => {
    const wrapper = mount(ShsSelect, { props: { options } })
    await wrapper.find('.shs-select').trigger('click')
    await nextTick()
    expect(wrapper.findAll('.shs-select__option')).toHaveLength(3)
  })

  it('选择选项触发 update:modelValue 与 change 并收起', async () => {
    const wrapper = mount(ShsSelect, { props: { options } })
    await wrapper.find('.shs-select').trigger('click')
    await nextTick()
    await wrapper.findAll('.shs-select__option')[1].trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['banana'])
    expect(wrapper.emitted('change')![0]).toEqual(['banana'])
    expect(wrapper.classes()).not.toContain('is-open')
  })

  it('disabled 时不展开下拉', async () => {
    const wrapper = mount(ShsSelect, { props: { options, disabled: true } })
    await wrapper.find('.shs-select').trigger('click')
    await nextTick()
    expect(wrapper.find('.shs-select__dropdown').exists()).toBe(false)
  })

  it('clearable 且有值时点击清空', async () => {
    const wrapper = mount(ShsSelect, {
      props: { options, modelValue: 'apple', clearable: true },
    })
    await wrapper.find('.shs-select__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })
})
