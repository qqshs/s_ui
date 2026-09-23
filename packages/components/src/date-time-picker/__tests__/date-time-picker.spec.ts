import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { ShsDateTimePicker } from '../index'

describe('ShsDateTimePicker', () => {
  it('渲染占位文本', () => {
    const wrapper = mount(ShsDateTimePicker, { props: { placeholder: '选择日期时间' } })
    expect(wrapper.text()).toContain('选择日期时间')
  })

  it('点击输入框展开面板', async () => {
    const wrapper = mount(ShsDateTimePicker)
    await wrapper.find('.shs-date-picker__input').trigger('click')
    await nextTick()
    expect(wrapper.find('.shs-date-picker__panel').exists()).toBe(true)
  })

  it('选日期与时间后点击确定触发完整格式', async () => {
    const wrapper = mount(ShsDateTimePicker, {
      props: { modelValue: '2026-09-23 08:30' },
    })
    await wrapper.find('.shs-date-picker__input').trigger('click')
    await nextTick()
    // 选中另一天
    const day = wrapper.find('.shs-date-picker__cell:not(.is-empty)')
    await day.trigger('click')
    // 修改时
    const selects = wrapper.findAll('select')
    await selects[0].setValue('10')
    await wrapper.find('.shs-date-time-picker__confirm').trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')![0][0]).toMatch(/^\d{4}-\d{2}-\d{2} 10:\d{2}$/)
    expect(wrapper.emitted('change')![0][0]).toMatch(/^\d{4}-\d{2}-\d{2} 10:\d{2}$/)
    expect(wrapper.find('.shs-date-picker__panel').exists()).toBe(false)
  })
})
