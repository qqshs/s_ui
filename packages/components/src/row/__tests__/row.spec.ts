import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsRow } from '../index'

describe('ShsRow', () => {
  it('渲染容器并渲染默认插槽', () => {
    const wrapper = mount(ShsRow, { slots: { default: '<span>内容</span>' } })
    expect(wrapper.classes()).toContain('shs-row')
    expect(wrapper.text()).toContain('内容')
  })

  it('justify=center 追加排列类名', () => {
    const wrapper = mount(ShsRow, { props: { justify: 'center' } })
    expect(wrapper.classes()).toContain('is-justify-center')
  })

  it('gutter>0 时应用负边距', () => {
    const wrapper = mount(ShsRow, { props: { gutter: 20 } })
    expect(wrapper.attributes('style')).toContain('margin-left: -10px')
  })
})
