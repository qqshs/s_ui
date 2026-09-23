import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsMenu } from '../index'

const items = [
  { label: '首页', key: 'home' },
  {
    label: '组件',
    key: 'components',
    children: [
      { label: '按钮', key: 'button' },
      { label: '表格', key: 'table' },
    ],
  },
  { label: '禁用项', key: 'disabled', disabled: true },
]

describe('ShsMenu', () => {
  it('渲染顶层菜单项', () => {
    const wrapper = mount(ShsMenu, { props: { items } })
    expect(wrapper.findAll('.shs-menu-item').length).toBe(3)
    expect(wrapper.text()).toContain('首页')
  })

  it('点击叶子项触发 select', async () => {
    const wrapper = mount(ShsMenu, { props: { items } })
    await wrapper.findAll('.shs-menu-item')[0].trigger('click')
    expect(wrapper.emitted('select')![0][0]).toBe('home')
  })

  it('点击带子菜单项展开子项', async () => {
    const wrapper = mount(ShsMenu, { props: { items } })
    await wrapper.findAll('.shs-menu-item')[1].trigger('click')
    expect(wrapper.findAll('.shs-menu-item').length).toBe(5) // 3 顶层 + 2 子
  })

  it('点击子项触发 select', async () => {
    const wrapper = mount(ShsMenu, { props: { items } })
    await wrapper.findAll('.shs-menu-item')[1].trigger('click')
    await wrapper.findAll('.shs-menu-item')[2].trigger('click')
    expect(wrapper.emitted('select')![0][0]).toBe('button')
  })

  it('disabled 项不触发 select', async () => {
    const wrapper = mount(ShsMenu, { props: { items } })
    await wrapper.findAll('.shs-menu-item')[2].trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
  })
})
