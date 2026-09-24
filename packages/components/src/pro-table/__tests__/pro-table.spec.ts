import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsProTable } from '../index'

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
]
const dataSource = [
  { name: '张三', age: 28 },
  { name: '李四', age: 32 },
]
const searchFields = [{ prop: 'keyword', label: '关键词' }]

describe('ShsProTable', () => {
  it('渲染搜索区、表格与分页', () => {
    const wrapper = mount(ShsProTable, {
      props: { columns, dataSource, searchFields, total: 100 },
    })
    expect(wrapper.find('.shs-pro-table__search').exists()).toBe(true)
    expect(wrapper.find('.shs-table').exists()).toBe(true)
    expect(wrapper.find('.shs-pagination').exists()).toBe(true)
    expect(wrapper.text()).toContain('张三')
  })

  it('查询触发 search 事件并携带参数', async () => {
    const wrapper = mount(ShsProTable, { props: { columns, dataSource, searchFields } })
    await wrapper.find('input[type="text"]').setValue('张三')
    await wrapper.findAll('.shs-button--primary')[0].trigger('click')
    expect((wrapper.emitted('search')![0][0] as Record<string, unknown>).keyword).toBe('张三')
  })

  it('重置清空参数并触发 reset', async () => {
    const wrapper = mount(ShsProTable, { props: { columns, dataSource, searchFields } })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('x')
    await wrapper.findAll('.shs-button')[1].trigger('click')
    expect(wrapper.emitted('reset')!.length).toBe(1)
    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('分页变化触发 update:currentPage', async () => {
    const wrapper = mount(ShsProTable, {
      props: { columns, dataSource, searchFields, total: 100 },
    })
    const btns = wrapper.findAll('.shs-pagination__btn')
    await btns[btns.length - 1].trigger('click')
    const emitted = wrapper.emitted('update:currentPage')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBe(2)
  })
})
