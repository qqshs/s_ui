import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsHeader } from '../index'

describe('ShsHeader', () => {
  it('渲染 header 标签与默认插槽', () => {
    const wrapper = mount(ShsHeader, { slots: { default: '顶栏' } })
    expect(wrapper.element.tagName).toBe('HEADER')
    expect(wrapper.classes()).toContain('shs-header')
    expect(wrapper.text()).toContain('顶栏')
  })

  it('height 数字转 px', () => {
    const wrapper = mount(ShsHeader, { props: { height: 48 } })
    expect(wrapper.attributes('style')).toContain('height: 48px')
  })

  it('height 字符串原样透传', () => {
    const wrapper = mount(ShsHeader, { props: { height: '10vh' } })
    expect(wrapper.attributes('style')).toContain('height: 10vh')
  })
})
