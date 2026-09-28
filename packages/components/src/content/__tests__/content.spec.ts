import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsContent } from '../index'

describe('ShsContent', () => {
  it('渲染 main 标签与默认插槽', () => {
    const wrapper = mount(ShsContent, { slots: { default: '主内容区' } })
    expect(wrapper.element.tagName).toBe('MAIN')
    expect(wrapper.classes()).toContain('shs-content')
    expect(wrapper.text()).toContain('主内容区')
  })
})
