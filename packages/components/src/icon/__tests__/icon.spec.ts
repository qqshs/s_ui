import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsIcon } from '../index'

describe('ShsIcon', () => {
  it('按 name 渲染对应 svg path', () => {
    const wrapper = mount(ShsIcon, { props: { name: 'check' } })
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('path').attributes('d')).toContain('M20 6')
  })

  it('支持自定义尺寸（数字转 px）', () => {
    const wrapper = mount(ShsIcon, { props: { name: 'close', size: 24 } })
    expect(wrapper.attributes('width')).toBe('24px')
    expect(wrapper.attributes('height')).toBe('24px')
  })

  it('支持自定义颜色', () => {
    const wrapper = mount(ShsIcon, { props: { name: 'info', color: '#ff0000' } })
    expect(wrapper.attributes('stroke')).toBe('#ff0000')
  })
})
