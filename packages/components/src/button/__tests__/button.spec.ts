import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsButton } from '../index'

describe('ShsButton', () => {
  it('渲染基础结构与默认插槽内容', () => {
    const wrapper = mount(ShsButton, { slots: { default: '确定' } })
    expect(wrapper.classes()).toContain('shs-button')
    expect(wrapper.text()).toContain('确定')
  })

  it('type=primary 时追加类型类名', () => {
    const wrapper = mount(ShsButton, { props: { type: 'primary' } })
    expect(wrapper.classes()).toContain('shs-button--primary')
  })

  it('disabled 时渲染原生 disabled 属性', () => {
    const wrapper = mount(ShsButton, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('点击触发 click 事件', async () => {
    const wrapper = mount(ShsButton, { slots: { default: '点击' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
