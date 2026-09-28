import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsAside } from '../index'

describe('ShsAside', () => {
  it('渲染 aside 标签与默认插槽', () => {
    const wrapper = mount(ShsAside, { slots: { default: '侧栏' } })
    expect(wrapper.element.tagName).toBe('ASIDE')
    expect(wrapper.classes()).toContain('shs-aside')
    expect(wrapper.text()).toContain('侧栏')
  })

  it('width 数字转 px', () => {
    const wrapper = mount(ShsAside, { props: { width: 240 } })
    expect(wrapper.attributes('style')).toContain('width: 240px')
  })

  it('width 字符串原样透传', () => {
    const wrapper = mount(ShsAside, { props: { width: '25%' } })
    expect(wrapper.attributes('style')).toContain('width: 25%')
  })
})
