# Message 消息提示

命令式消息提示，通过 `message` 函数式调用，自动关闭。

## 基础用法

```ts
import { message } from '@shs-ui/components'

message.success('操作成功')
message.error('操作失败')
message.warning('请检查输入')
message.info('这是一条提示')
```

也支持传入对象自定义时长（`duration: 0` 表示不自动关闭）：

```ts
message.success('已保存', { duration: 5000 })
```

## 类型

| 方法 | 说明 |
| --- | --- |
| message(content \| options) | 默认 info 类型 |
| message.success(content, options?) | 成功 |
| message.error(content, options?) | 错误 |
| message.warning(content, options?) | 警告 |
| message.info(content, options?) | 提示 |

## 参数

| 字段 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 消息内容 | `string` | 必填 |
| type | 类型 | `success \| error \| warning \| info` | `info` |
| duration | 展示时长（ms） | `number` | `3000` |
