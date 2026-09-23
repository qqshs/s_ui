import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsCol } from '../index'

describe('ShsCol', () => {
  it('渲染列并计算栅格宽度', () => {
    const wrapper = mount(ShsCol, { props: { span: 8 } })
    expect(wrapper.classes()).toContain('shs-col')
    expect(wrapper.attributes('style')).toMatch(/width:\s*33\.33/)
  })

  it('offset 应用左侧外边距', () => {
    const wrapper = mount(ShsCol, { props: { span: 12, offset: 4 } })
    expect(wrapper.attributes('style')).toMatch(/margin-left:\s*16\.66/)
  })
})
