import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ShsUpload, type UploadFile } from '../index'

const triggerSelect = async (wrapper: ReturnType<typeof mount>, name = 'a.txt') => {
  const input = wrapper.find('input[type="file"]')
  const file = new File(['abc'], name, { type: 'text/plain' })
  Object.defineProperty(input.element, 'files', { value: [file], writable: true })
  await input.trigger('change')
}

describe('ShsUpload', () => {
  it('选择文件后追加到列表并触发事件', async () => {
    const wrapper = mount(ShsUpload)
    await triggerSelect(wrapper, 'a.txt')
    const list = wrapper.emitted('update:modelValue')![0][0] as UploadFile[]
    expect(list.length).toBe(1)
    expect(list[0].name).toBe('a.txt')
    expect((wrapper.emitted('change')![0][0] as UploadFile[]).length).toBe(1)
  })

  it('multiple=false 时替换为单文件', async () => {
    const wrapper = mount(ShsUpload)
    await triggerSelect(wrapper, 'a.txt')
    await triggerSelect(wrapper, 'b.txt')
    const list = wrapper.emitted('update:modelValue')![1][0] as UploadFile[]
    expect(list.length).toBe(1)
    expect(list[0].name).toBe('b.txt')
  })

  it('渲染已有文件列表并移除', async () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'report.pdf', size: 2048 },
      { uid: '2', name: 'pic.png', size: 1024 * 1024 },
    ]
    const wrapper = mount(ShsUpload, { props: { modelValue: files } })
    expect(wrapper.findAll('.shs-upload__item').length).toBe(2)
    expect(wrapper.text()).toContain('2.0 KB')
    expect(wrapper.text()).toContain('1.0 MB')
    await wrapper.findAll('.shs-upload__remove')[0].trigger('click')
    const after = wrapper.emitted('update:modelValue')![0][0] as UploadFile[]
    expect(after.length).toBe(1)
    expect(wrapper.emitted('remove')![0][0]).toBe('1')
  })

  it('disabled 时不显示移除按钮', () => {
    const files: UploadFile[] = [{ uid: '1', name: 'a.txt', size: 10 }]
    const wrapper = mount(ShsUpload, { props: { modelValue: files, disabled: true } })
    expect(wrapper.find('.shs-upload__remove').exists()).toBe(false)
  })
})
