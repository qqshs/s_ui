import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsTree } from '../index'

const data = [
  {
    label: '节点A',
    children: [{ label: 'A-1' }, { label: 'A-2' }],
  },
  { label: '节点B' },
]

describe('ShsTree', () => {
  it('渲染根节点，子节点默认隐藏', () => {
    const wrapper = mount(ShsTree, { props: { data } })
    expect(wrapper.findAll('.shs-tree__node').length).toBe(2)
    expect(wrapper.text()).not.toContain('A-1')
  })

  it('defaultExpandAll 展开子节点', () => {
    const wrapper = mount(ShsTree, { props: { data, defaultExpandAll: true } })
    const nodes = wrapper.findAll('.shs-tree__node')
    expect(nodes.length).toBe(4)
    expect(wrapper.text()).toContain('A-1')
  })

  it('点击箭头展开/收起', async () => {
    const wrapper = mount(ShsTree, { props: { data } })
    await wrapper.findAll('.shs-tree__arrow')[0].trigger('click')
    expect(wrapper.findAll('.shs-tree__node').length).toBe(4)
    await wrapper.findAll('.shs-tree__arrow')[0].trigger('click')
    expect(wrapper.findAll('.shs-tree__node').length).toBe(2)
  })

  it('点击节点触发选中事件', async () => {
    const wrapper = mount(ShsTree, { props: { data } })
    await wrapper.findAll('.shs-tree__node')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('节点B')
    expect((wrapper.emitted('select')![0][0] as { label: string }).label).toBe('节点B')
  })
})
