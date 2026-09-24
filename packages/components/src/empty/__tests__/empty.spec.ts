import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsEmpty } from '../index'

describe('ShsEmpty', () => {
  it('渲染默认空状态（内置图形 + 默认描述）', () => {
    const wrapper = mount(ShsEmpty)
    expect(wrapper.find('.shs-empty__default').exists()).toBe(true)
    expect(wrapper.find('.shs-empty__description').text()).toBe('暂无数据')
    expect(wrapper.classes()).toContain('shs-empty--medium')
  })

  it('自定义描述与尺寸', () => {
    const wrapper = mount(ShsEmpty, {
      props: { description: '没有更多了', size: 'large' },
    })
    expect(wrapper.find('.shs-empty__description').text()).toBe('没有更多了')
    expect(wrapper.classes()).toContain('shs-empty--large')
  })

  it('渲染自定义图片', () => {
    const wrapper = mount(ShsEmpty, {
      props: { image: 'https://example.com/empty.png' },
    })
    const img = wrapper.find('.shs-empty__img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/empty.png')
  })

  it('渲染图标与默认插槽', () => {
    const wrapper = mount(ShsEmpty, {
      props: { icon: 'search' },
      slots: { default: '<button>去添加</button>' },
    })
    expect(wrapper.find('.shs-icon').exists()).toBe(true)
    expect(wrapper.find('.shs-empty__footer button').text()).toBe('去添加')
  })

  it('description 插槽覆盖 prop', () => {
    const wrapper = mount(ShsEmpty, {
      props: { description: 'prop描述' },
      slots: { description: '<b>插槽描述</b>' },
    })
    expect(wrapper.find('.shs-empty__description').text()).toBe('插槽描述')
  })
})
