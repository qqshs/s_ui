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

  it('默认不显示连接线，showLine 开启后显示完整连接线', () => {
    const wrapper = mount(ShsTree, { props: { data, defaultExpandAll: true } })
    expect(wrapper.findAll('.shs-tree__line-v').length).toBe(0)
    expect(wrapper.findAll('.shs-tree__line-h').length).toBe(0)

    const withLine = mount(ShsTree, { props: { data, defaultExpandAll: true, showLine: true } })
    // A-1、A-2 两个子节点各带 1 条横向连接线
    expect(withLine.findAll('.shs-tree__line-h').length).toBe(2)
    // 两个子节点各带 1 条竖向连接线（延续根层级，保证根到叶连续）
    expect(withLine.findAll('.shs-tree__line-v').length).toBe(2)
  })

  it('深层节点竖向连接线延续所有祖先层级（根到叶连续）', () => {
    const deep = [{ label: 'A', children: [{ label: 'A-1', children: [{ label: 'A-1-1' }] }] }]
    const wrapper = mount(ShsTree, {
      props: { data: deep, defaultExpandAll: true, showLine: true },
    })
    // A-1（深度1）：1 条竖向段；A-1-1（深度2）：2 条竖向段 → 共 3 条，横向段各 1 条
    expect(wrapper.findAll('.shs-tree__line-v').length).toBe(3)
    expect(wrapper.findAll('.shs-tree__line-h').length).toBe(2)
  })
})
