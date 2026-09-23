import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { ShsDatePicker } from '../index'

describe('ShsDatePicker', () => {
  it('渲染占位文本', () => {
    const wrapper = mount(ShsDatePicker, { props: { placeholder: '选择日期' } })
    expect(wrapper.text()).toContain('选择日期')
  })

  it('点击输入框展开日历面板', async () => {
    const wrapper = mount(ShsDatePicker)
    await wrapper.find('.shs-date-picker__input').trigger('click')
    await nextTick()
    expect(wrapper.find('.shs-date-picker__panel').exists()).toBe(true)
  })

  it('选择日期触发 update:modelValue 与 change 并关闭面板', async () => {
    const wrapper = mount(ShsDatePicker)
    await wrapper.find('.shs-date-picker__input').trigger('click')
    await nextTick()
    const day = wrapper.find('.shs-date-picker__cell:not(.is-empty)')
    await day.trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')![0][0]).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(wrapper.emitted('change')![0][0]).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(wrapper.find('.shs-date-picker__panel').exists()).toBe(false)
  })

  it('有值时 clearable 清空', async () => {
    const wrapper = mount(ShsDatePicker, {
      props: { modelValue: '2026-09-23', clearable: true },
    })
    const closeIcon = wrapper.find('.shs-date-picker__input .shs-icon')
    expect(closeIcon.exists()).toBe(true)
    await closeIcon.trigger('click')
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })
})
