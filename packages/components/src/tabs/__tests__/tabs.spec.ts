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

  describe('可关闭', () => {
    it('tabs 级 closable 时显示关闭按钮（禁用项除外）', () => {
      const wrapper = mount(ShsTabs, {
        props: { modelValue: 'a', tabs, closable: true },
      })
      // tabs 含 3 项，其中第 2 项禁用不显示关闭按钮
      expect(wrapper.findAll('.shs-tabs__close').length).toBe(2)
    })

    it('点击关闭触发 close 事件且不切换激活', async () => {
      const wrapper = mount(ShsTabs, {
        props: { modelValue: 'a', tabs, closable: true },
      })
      // 关闭按钮顺序对应可关闭项：a、c
      await wrapper.findAll('.shs-tabs__close')[1].trigger('click')
      expect(wrapper.emitted('close')![0][0]).toBe('c')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('单个 tab 的 closable 覆盖全局设置', () => {
      const wrapper = mount(ShsTabs, {
        props: { modelValue: 'a', tabs, closable: false },
      })
      // 全局关闭，但为其中一项单独开启
      const withItem = mount(ShsTabs, {
        props: {
          modelValue: 'a',
          tabs: [
            { name: 'a', label: 'A', closable: true },
            { name: 'b', label: 'B' },
          ],
        },
      })
      expect(wrapper.find('.shs-tabs__close').exists()).toBe(false)
      expect(withItem.findAll('.shs-tabs__close').length).toBe(1)
    })

    it('禁用项不显示关闭按钮', () => {
      const wrapper = mount(ShsTabs, {
        props: { modelValue: 'a', tabs, closable: true },
      })
      const disabledTab = wrapper.findAll('.shs-tabs__tab')[1]
      expect(disabledTab.find('.shs-tabs__close').exists()).toBe(false)
    })
  })

  describe('样式类型', () => {
    it('folder 类型添加文件夹样式类', () => {
      const wrapper = mount(ShsTabs, { props: { modelValue: 'a', tabs, type: 'folder' } })
      expect(wrapper.classes()).toContain('shs-tabs--folder')
    })

    it('card 类型添加卡片样式类', () => {
      const wrapper = mount(ShsTabs, { props: { modelValue: 'a', tabs, type: 'card' } })
      expect(wrapper.classes()).toContain('shs-tabs--card')
    })

    it('包含可滚动导航容器与滑动按钮结构', () => {
      const wrapper = mount(ShsTabs, { props: { modelValue: 'a', tabs } })
      expect(wrapper.find('.shs-tabs__nav-scroll').exists()).toBe(true)
      expect(wrapper.find('.shs-tabs__nav-btn.is-prev').exists()).toBe(true)
      expect(wrapper.find('.shs-tabs__nav-btn.is-next').exists()).toBe(true)
    })
  })
})
