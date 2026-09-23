import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsPagination } from '../index'

describe('ShsPagination', () => {
  it('根据 total/pageSize 渲染页码', () => {
    const wrapper = mount(ShsPagination, { props: { total: 35, pageSize: 10 } })
    // 上一页 + 4 个页码 + 下一页
    expect(wrapper.findAll('.shs-pagination__btn').length).toBe(6)
  })

  it('点击页码触发 update:currentPage 与 change', async () => {
    const wrapper = mount(ShsPagination, {
      props: { total: 35, pageSize: 10, currentPage: 1 },
    })
    const btns = wrapper.findAll('.shs-pagination__btn')
    // index 0 上一页，index 1~4 页码，index 5 下一页 → 点击页码 2
    await btns[2].trigger('click')
    expect(wrapper.emitted('update:currentPage')![0][0]).toBe(2)
    expect(wrapper.emitted('change')![0][0]).toBe(2)
  })

  it('当前页高亮', () => {
    const wrapper = mount(ShsPagination, {
      props: { total: 35, pageSize: 10, currentPage: 3 },
    })
    expect(wrapper.find('.is-active').text()).toBe('3')
  })

  it('点击当前页或越界页不触发事件', async () => {
    const wrapper = mount(ShsPagination, {
      props: { total: 35, pageSize: 10, currentPage: 1 },
    })
    const btns = wrapper.findAll('.shs-pagination__btn')
    await btns[1].trigger('click') // 当前页 1
    expect(wrapper.emitted('update:currentPage')).toBeUndefined()
    await btns[0].trigger('click') // 上一页（边界）
    expect(wrapper.emitted('update:currentPage')).toBeUndefined()
  })
})
