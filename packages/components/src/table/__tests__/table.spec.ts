import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsTable } from '../index'
import type { TableColumn } from '../props'

const columns: TableColumn[] = [
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age', align: 'center' },
]
const data = [
  { name: '张三', age: 18 },
  { name: '李四', age: 20 },
]

describe('ShsTable', () => {
  it('渲染表头与数据行', () => {
    const wrapper = mount(ShsTable, { props: { columns, data } })
    expect(wrapper.findAll('th').length).toBe(2)
    expect(wrapper.text()).toContain('姓名')
    expect(wrapper.text()).toContain('张三')
    expect(wrapper.findAll('tbody tr').length).toBe(2)
  })

  it('border 与 striped 类名', () => {
    const wrapper = mount(ShsTable, {
      props: { columns, data, border: true, striped: true },
    })
    expect(wrapper.classes()).toContain('is-border')
    expect(wrapper.classes()).toContain('is-striped')
  })

  it('空数据显示暂无数据', () => {
    const wrapper = mount(ShsTable, { props: { columns, data: [] } })
    expect(wrapper.text()).toContain('暂无数据')
  })

  it('点击行触发 row-click', async () => {
    const wrapper = mount(ShsTable, { props: { columns, data } })
    await wrapper.find('tbody tr').trigger('click')
    expect(wrapper.emitted('row-click')).toBeTruthy()
    expect(wrapper.emitted('row-click')![0][0]).toEqual({ name: '张三', age: 18 })
  })

  it('自定义单元格插槽渲染', () => {
    const wrapper = mount(ShsTable, {
      props: { columns, data },
      slots: {
        'cell-name': `<template #cell-name="{ row }"><strong>{{ row.name }}</strong></template>`,
      },
    })
    expect(wrapper.find('tbody strong').exists()).toBe(true)
  })
})
