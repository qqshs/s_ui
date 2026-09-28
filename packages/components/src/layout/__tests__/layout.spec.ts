import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { ShsLayout } from '../index'
import { ShsAside } from '../../aside'
import { ShsContent } from '../../content'
import { ShsHeader } from '../../header'
import { ShsFooter } from '../../footer'

describe('ShsLayout', () => {
  it('渲染容器与默认插槽', () => {
    const wrapper = mount(ShsLayout, { slots: { default: '内容' } })
    expect(wrapper.classes()).toContain('shs-layout')
    expect(wrapper.text()).toContain('内容')
  })

  it('默认纵向布局（无 is-has-aside）', () => {
    const wrapper = mount(ShsLayout, { slots: { default: '<div>块</div>' } })
    expect(wrapper.classes()).not.toContain('is-has-aside')
  })

  it('包含 Aside 时切换为横向布局', () => {
    const wrapper = mount(ShsLayout, {
      slots: {
        default: () => [h(ShsAside, null, () => '侧栏'), h(ShsContent, null, () => '主区')],
      },
    })
    expect(wrapper.classes()).toContain('is-has-aside')
  })

  it('嵌套 Layout 中的 Aside 不影响外层方向（外层仍纵向）', () => {
    const wrapper = mount(ShsLayout, {
      slots: {
        default: () => [
          h(ShsHeader, null, () => '顶栏'),
          h(ShsLayout, null, () => [
            h(ShsAside, null, () => '侧栏'),
            h(ShsContent, null, () => '主区'),
          ]),
          h(ShsFooter, null, () => '页脚'),
        ],
      },
    })
    expect(wrapper.classes()).not.toContain('is-has-aside')
  })

  it('非直接子级的 Aside 不触发横向布局（普通包裹元素）', () => {
    const wrapper = mount(ShsLayout, {
      slots: {
        default: () => [h('div', null, () => h(ShsAside, null, () => '侧栏'))],
      },
    })
    expect(wrapper.classes()).not.toContain('is-has-aside')
  })
})
