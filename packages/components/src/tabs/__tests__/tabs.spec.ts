import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsTabs } from '../index'

const tabs = [
  { name: 'a', label: '标签A' },
  { name: 'b', label: '标签B', disabled: true },
  { name: 'c', label: '标签C' },
]

describe('ShsTabs', () => {
  it('渲染 tab 列表并高亮激活项', () => {
    const wrapper = mount(ShsTabs, { props: { modelValue: 'a', tabs } })
    const items = wrapper.findAll('.shs-tabs__tab')
    expect(items.length).toBe(3)
    expect(items[0].classes()).toContain('is-active')
  })

  it('点击切换激活并触发事件', async () => {
    const wrapper = mount(ShsTabs, { props: { modelValue: 'a', tabs } })
    await wrapper.findAll('.shs-tabs__tab')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('c')
    expect(wrapper.emitted('change')![0][0]).toBe('c')
  })

  it('禁用项不可点击', async () => {
    const wrapper = mount(ShsTabs, { props: { modelValue: 'a', tabs } })
    await wrapper.findAll('.shs-tabs__tab')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('渲染当前面板插槽', () => {
    const wrapper = mount(ShsTabs, {
      props: { modelValue: 'a', tabs },
      slots: { 'pane-a': '<div class="panel">面板A</div>' },
    })
    expect(wrapper.find('.shs-tabs__content .panel').text()).toBe('面板A')
  })
})
