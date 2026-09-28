import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsFooter } from '../index'

describe('ShsFooter', () => {
  it('渲染 footer 标签与默认插槽', () => {
    const wrapper = mount(ShsFooter, { slots: { default: '页脚' } })
    expect(wrapper.element.tagName).toBe('FOOTER')
    expect(wrapper.classes()).toContain('shs-footer')
    expect(wrapper.text()).toContain('页脚')
  })

  it('height 数字转 px', () => {
    const wrapper = mount(ShsFooter, { props: { height: 44 } })
    expect(wrapper.attributes('style')).toContain('height: 44px')
  })
})
