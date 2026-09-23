import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsTag } from '../index'

describe('ShsTag', () => {
  it('渲染默认标签与插槽内容', () => {
    const wrapper = mount(ShsTag, { slots: { default: '标签' } })
    expect(wrapper.classes()).toContain('shs-tag')
    expect(wrapper.text()).toContain('标签')
  })

  it('type=primary 追加类型类名', () => {
    const wrapper = mount(ShsTag, { props: { type: 'primary' } })
    expect(wrapper.classes()).toContain('shs-tag--primary')
  })

  it('closable 时渲染关闭按钮并触发 close', async () => {
    const wrapper = mount(ShsTag, { props: { closable: true }, slots: { default: '可关闭' } })
    const btn = wrapper.find('.shs-tag__close')
    expect(btn.exists()).toBe(true)
    await btn.trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('disabled 时不渲染关闭按钮', () => {
    const wrapper = mount(ShsTag, {
      props: { closable: true, disabled: true },
      slots: { default: '禁用' },
    })
    expect(wrapper.find('.shs-tag__close').exists()).toBe(false)
  })
})
