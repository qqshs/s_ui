import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsCard } from '../index'

describe('ShsCard', () => {
  it('渲染卡片结构与默认插槽', () => {
    const wrapper = mount(ShsCard, { slots: { default: '内容' } })
    expect(wrapper.classes()).toContain('shs-card')
    expect(wrapper.find('.shs-card__body').text()).toContain('内容')
  })

  it('title 属性渲染到头部', () => {
    const wrapper = mount(ShsCard, { props: { title: '标题' } })
    expect(wrapper.find('.shs-card__header').text()).toContain('标题')
  })

  it('header 插槽优先于 title', () => {
    const wrapper = mount(ShsCard, {
      props: { title: '属性标题' },
      slots: { header: '插槽标题' },
    })
    expect(wrapper.find('.shs-card__header').text()).toContain('插槽标题')
    expect(wrapper.find('.shs-card__header').text()).not.toContain('属性标题')
  })

  it('footer 插槽渲染到页脚', () => {
    const wrapper = mount(ShsCard, { slots: { footer: '操作区' } })
    expect(wrapper.find('.shs-card__footer').text()).toContain('操作区')
  })
})
