import { describe, it, expect } from 'vitest'
import { reactive, h } from 'vue'
import { mount } from '@vue/test-utils'
import { ShsForm } from '../index'
import { ShsFormItem } from '../form-item/index'

describe('ShsForm + ShsFormItem', () => {
  it('渲染标签与插槽内容', () => {
    const model = reactive({ name: '张三' })
    const wrapper = mount(ShsForm, {
      props: { model },
      slots: {
        default: () =>
          h(ShsFormItem, { label: '姓名', prop: 'name' }, () => h('input', { value: '张三' })),
      },
    })
    expect(wrapper.find('.shs-form-item__label').text()).toContain('姓名')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('required 校验失败时显示错误并 validate 返回 false', async () => {
    const model = reactive({ name: '' })
    const wrapper = mount(ShsForm, {
      props: {
        model,
        rules: { name: { required: true, message: '请输入姓名' } },
      },
      slots: {
        default: () => h(ShsFormItem, { label: '姓名', prop: 'name' }, () => h('input')),
      },
    })
    const valid = await (wrapper.vm as unknown as { validate: () => Promise<boolean> }).validate()
    await wrapper.vm.$nextTick()
    expect(valid).toBe(false)
    expect(wrapper.find('.shs-form-item__error').text()).toContain('请输入姓名')
  })

  it('校验通过时 validate 返回 true 且无错误', async () => {
    const model = reactive({ name: '张三' })
    const wrapper = mount(ShsForm, {
      props: {
        model,
        rules: { name: { required: true, message: '请输入姓名' } },
      },
      slots: {
        default: () => h(ShsFormItem, { label: '姓名', prop: 'name' }, () => h('input')),
      },
    })
    const valid = await (wrapper.vm as unknown as { validate: () => Promise<boolean> }).validate()
    expect(valid).toBe(true)
    expect(wrapper.find('.shs-form-item__error').exists()).toBe(false)
  })

  it('支持长度校验规则', async () => {
    const model = reactive({ phone: '12' })
    const wrapper = mount(ShsForm, {
      props: {
        model,
        rules: { phone: { min: 5, message: '长度至少 5 位' } },
      },
      slots: {
        default: () => h(ShsFormItem, { prop: 'phone' }, () => h('input')),
      },
    })
    const valid = await (wrapper.vm as unknown as { validate: () => Promise<boolean> }).validate()
    await wrapper.vm.$nextTick()
    expect(valid).toBe(false)
    expect(wrapper.find('.shs-form-item__error').text()).toContain('长度至少 5 位')
  })
})
