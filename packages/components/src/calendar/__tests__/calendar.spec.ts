import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { ShsCalendar } from '../index'

const events = [
  { id: '1', date: '2026-09-23', title: '开会' },
  { id: '2', date: '2026-09-23', title: '写周报' },
  { id: '3', date: '2026-09-23', title: '出差' },
]

const openPopover = async (wrapper: VueWrapper) => {
  const dayCell = wrapper
    .findAll('.shs-calendar__cell')
    .find((c) => c.find('.shs-calendar__todo-mini').exists())
  expect(dayCell).toBeTruthy()
  await dayCell!.trigger('click')
  await nextTick()
}

describe('ShsCalendar', () => {
  it('天格内显示待办（最多两条）与更多徽标', () => {
    const wrapper = mount(ShsCalendar, { props: { events } })
    // 09-23 有 3 条 → 格内两条 + 「更多1」
    expect(wrapper.findAll('.shs-calendar__todo-mini').length).toBe(2)
    const more = wrapper.find('.shs-calendar__more')
    expect(more.exists()).toBe(true)
    expect(more.text()).toBe('更多1')
  })

  it('点击天格打开浮层并展示该日待办', async () => {
    const wrapper = mount(ShsCalendar, { props: { events } })
    await openPopover(wrapper)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.find('.shs-calendar__popover').exists()).toBe(true)
    // 浮层展示 09-23 全部 3 条
    expect(wrapper.findAll('.shs-calendar__popover .shs-calendar__todo').length).toBe(3)
  })

  it('浮层内添加待办', async () => {
    const wrapper = mount(ShsCalendar, { props: { events } })
    await openPopover(wrapper)
    await wrapper.find('.shs-calendar__add-input').setValue('新待办')
    await wrapper.find('.shs-calendar__add-btn').trigger('click')
    const payload = wrapper.emitted('update:events')![0][0] as {
      id: string
      date: string
      title: string
    }[]
    expect(payload.length).toBe(4)
    expect(payload[3].title).toBe('新待办')
    expect((wrapper.emitted('add')![0][0] as { title: string }).title).toBe('新待办')
  })

  it('浮层内编辑待办', async () => {
    const wrapper = mount(ShsCalendar, { props: { events } })
    await openPopover(wrapper)
    await wrapper.find('.shs-calendar__popover .shs-calendar__todo-title').trigger('click')
    await wrapper.find('.shs-calendar__todo-input').setValue('开会(改)')
    await wrapper.find('.shs-calendar__todo-save').trigger('click')
    const payload = wrapper.emitted('update:events')![0][0] as {
      id: string
      date: string
      title: string
    }[]
    expect(payload[0].title).toBe('开会(改)')
    expect((wrapper.emitted('update')![0][0] as { title: string }).title).toBe('开会(改)')
  })

  it('浮层内删除待办', async () => {
    const wrapper = mount(ShsCalendar, { props: { events } })
    await openPopover(wrapper)
    await wrapper.find('.shs-calendar__popover .shs-calendar__todo-del').trigger('click')
    const payload = wrapper.emitted('update:events')![0][0] as {
      id: string
      date: string
      title: string
    }[]
    expect(payload.length).toBe(2)
    expect(wrapper.emitted('remove')![0][0]).toBe('1')
  })

  it('editable 为 false 时浮层仅查看，无添加与删除', async () => {
    const wrapper = mount(ShsCalendar, { props: { events, editable: false } })
    await openPopover(wrapper)
    expect(wrapper.find('.shs-calendar__popover').exists()).toBe(true)
    expect(wrapper.find('.shs-calendar__add').exists()).toBe(false)
    expect(wrapper.find('.shs-calendar__todo-del').exists()).toBe(false)
  })

  it('浮层可通过关闭按钮关闭', async () => {
    const wrapper = mount(ShsCalendar, { props: { events } })
    await openPopover(wrapper)
    expect(wrapper.find('.shs-calendar__popover').exists()).toBe(true)
    await wrapper.find('.shs-calendar__popover-close').trigger('click')
    await nextTick()
    expect(wrapper.find('.shs-calendar__popover').exists()).toBe(false)
  })

  it('浮层显示详细农历', async () => {
    const wrapper = mount(ShsCalendar, { props: { events } })
    await openPopover(wrapper)
    const lunar = wrapper.find('.shs-calendar__popover-lunar')
    expect(lunar.exists()).toBe(true)
    expect(lunar.text()).toContain('农历')
  })
})
