# Tag 标签

用于标记、分类和状态展示。

## 基础用法

```vue
<template>
  <shs-tag>默认</shs-tag>
  <shs-tag type="primary">主要</shs-tag>
  <shs-tag type="success">成功</shs-tag>
  <shs-tag type="warning">警告</shs-tag>
  <shs-tag type="danger">危险</shs-tag>
</template>
```

## 可关闭

设置 `closable` 显示关闭按钮，点击触发 `close` 事件。

```vue
<template>
  <shs-tag type="primary" closable @close="onClose">可关闭</shs-tag>
</template>
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 标签类型 | `default \| primary \| success \| warning \| danger \| info` | `default` |
| size | 尺寸 | `small \| medium` | `medium` |
| closable | 是否可关闭 | `boolean` | `false` |
| disabled | 是否禁用（禁用时不可关闭） | `boolean` | `false` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| close | 点击关闭按钮时触发 | `MouseEvent` |
