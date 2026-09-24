import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsProForm, type ProField } from '../index'

const fields: ProField[] = [
  { prop: 'name', label: '姓名', required: true },
  { prop: 'city', label: '城市', type: 'select', options: [{ label: '北京', value: 'bj' }] },
  { prop: 'remark', label: '备注', type: 'textarea' },
]

describe('ShsProForm', () => {
  it('按 schema 渲染控件', () => {
    const wrapper = mount(ShsProForm, { props: { fields } })
    expect(wrapper.findAll('.shs-pro-form__item').length).toBe(3)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('.shs-select').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('提交必填字段为空时报错且 valid 为 false', async () => {
    const wrapper = mount(ShsProForm, { props: { fields } })
    await wrapper.find('.shs-pro-form__actions .shs-button--primary').trigger('click')
    const [data, valid] = wrapper.emitted('submit')![0] as [Record<string, unknown>, boolean]
    expect(valid).toBe(false)
    expect(data.name).toBe('')
    expect(wrapper.find('.shs-pro-form__error').text()).toContain('必填')
  })

  it('填写必填字段后提交 valid 为 true', async () => {
    const wrapper = mount(ShsProForm, { props: { fields } })
    await wrapper.find('input[type="text"]').setValue('张三')
    await wrapper.find('.shs-pro-form__actions .shs-button--primary').trigger('click')
    const [, valid] = wrapper.emitted('submit')![0] as [Record<string, unknown>, boolean]
    expect(valid).toBe(true)
  })

  it('重置恢复默认值', async () => {
    const wrapper = mount(ShsProForm, {
      props: { fields: [{ prop: 'name', label: '姓名', initialValue: '默认' }] as ProField[] },
    })
    const input = wrapper.find('input[type="text"]')
    await input.setValue('改过')
    await wrapper.findAll('.shs-button')[1].trigger('click')
    expect((input.element as HTMLInputElement).value).toBe('默认')
  })
})
