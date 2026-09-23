import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { ShsCheckbox, ShsCheckboxGroup } from '../index'

const BoxA = () => h(ShsCheckbox, { value: 'a', label: 'A' })
const BoxB = () => h(ShsCheckbox, { value: 'b', label: 'B' })

describe('ShsCheckboxGroup', () => {
  it('按 modelValue 数组渲染选中态', () => {
    const wrapper = mount(ShsCheckboxGroup, {
      props: { modelValue: ['a', 'c'] },
      slots: { default: () => [BoxA(), BoxB(), h(ShsCheckbox, { value: 'c', label: 'C' })] },
    })
    const boxes = wrapper.findAll('.shs-checkbox')
    expect(boxes.length).toBe(3)
    expect(boxes[0].classes()).toContain('is-checked')
    expect(boxes[1].classes()).not.toContain('is-checked')
    expect(boxes[2].classes()).toContain('is-checked')
  })

  it('点击选中项加入数组', async () => {
    const wrapper = mount(ShsCheckboxGroup, {
      props: { modelValue: ['a'] },
      slots: { default: () => [BoxA(), BoxB()] },
    })
    await wrapper.findAll('.shs-checkbox')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0][0]).toEqual(['a', 'b'])
  })

  it('点击已选项从数组移除', async () => {
    const wrapper = mount(ShsCheckboxGroup, {
      props: { modelValue: ['a', 'b'] },
      slots: { default: () => [BoxA(), BoxB()] },
    })
    await wrapper.findAll('.shs-checkbox')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0][0]).toEqual(['b'])
  })
})
