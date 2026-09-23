import { afterEach, describe, it, expect } from 'vitest'
import { message } from '../index'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('message 命令式 API', () => {
  it('message.success 挂载消息到 body 并渲染内容', () => {
    message.success('操作成功', { duration: 0 })
    const el = document.querySelector('.shs-message')
    expect(el).toBeTruthy()
    expect(el!.classList).toContain('shs-message--success')
    expect(el!.textContent).toContain('操作成功')
  })

  it('字符串参数默认 info 类型', () => {
    message({ content: '提示信息', duration: 0 })
    const el = document.querySelector('.shs-message')!
    expect(el.classList).toContain('shs-message--info')
  })

  it('duration 到期后自动移除', async () => {
    message.error('出错了', { duration: 20 })
    expect(document.querySelector('.shs-message')).toBeTruthy()
    await new Promise((resolve) => setTimeout(resolve, 60))
    expect(document.querySelector('.shs-message')).toBeNull()
  })
})
