import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsCalendar } from '../index'

const events = [
  { id: '1', date: '2026-09-23', title: '开会' },
  { id: '2', date: '2026-09-23', title: '写周报' },
  { id: '3', date: '2026-09-24', title: '出差' },
]

describe('ShsCalendar', () => {
  it('渲染月视图天格与待办徽标', () => {
    const wrapper = mount(ShsCalendar, { props: { events } })
    expect(wrapper.findAll('.shs-calendar__cell').length).toBeGreaterThan(28)
    expect(wrapper.findAll('.shs-calendar__badge').length).toBe(2)
  })

  it('选中日期展示对应待办', async () => {
    const wrapper = mount(ShsCalendar, {
      props: { events, modelValue: '2026-09-24' },
    })
    // 选中日由 modelValue 初始化，展示该日待办
    expect(wrapper.text()).toContain('出差')
    // 切换选中到 09-23
    await wrapper.find('.shs-calendar__cell.is-selected').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('添加待办触发 update:events 与 add', async () => {
    const wrapper = mount(ShsCalendar, {
      props: { events, modelValue: '2026-09-23' },
    })
    const input = wrapper.find('.shs-calendar__add-input')
    await input.setValue('新待办')
    await wrapper.find('.shs-calendar__add-btn').trigger('click')
    const payload = wrapper.emitted('update:events')![0][0] as {
      id: string
      date: string
      title: string
    }[]
    expect(payload.length).toBe(events.length + 1)
    expect(payload[payload.length - 1].title).toBe('新待办')
    expect(payload[payload.length - 1].date).toBe('2026-09-23')
    expect((wrapper.emitted('add')![0][0] as { title: string }).title).toBe('新待办')
  })

  it('编辑待办触发 update:events 与 update', async () => {
    const wrapper = mount(ShsCalendar, {
      props: { events, modelValue: '2026-09-23' },
    })
    // 进入编辑
    await wrapper.findAll('.shs-calendar__todo-title')[0].trigger('click')
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

  it('删除待办触发 update:events 与 remove', async () => {
    const wrapper = mount(ShsCalendar, {
      props: { events, modelValue: '2026-09-23' },
    })
    await wrapper.findAll('.shs-calendar__todo-del')[0].trigger('click')
    const payload = wrapper.emitted('update:events')![0][0] as {
      id: string
      date: string
      title: string
    }[]
    expect(payload.length).toBe(events.length - 1)
    expect(wrapper.emitted('remove')![0][0]).toBe('1')
  })

  it('editable 为 false 时隐藏添加与删除', () => {
    const wrapper = mount(ShsCalendar, {
      props: { events, editable: false, modelValue: '2026-09-23' },
    })
    expect(wrapper.find('.shs-calendar__add').exists()).toBe(false)
    expect(wrapper.find('.shs-calendar__todo-del').exists()).toBe(false)
  })
})
