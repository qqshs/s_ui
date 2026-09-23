# Button 按钮

基础按钮组件，支持多种类型与尺寸。

## 基础用法

```vue
<template>
  <shs-button>默认</shs-button>
  <shs-button type="primary">主要</shs-button>
  <shs-button type="success">成功</shs-button>
  <shs-button type="danger">危险</shs-button>
</template>
```

## 尺寸

通过 `size` 属性设置：`small` / `medium` / `large`。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `default \| primary \| success \| warning \| danger \| info` | `default` |
| size | 尺寸 | `small \| medium \| large` | `medium` |
| disabled | 是否禁用 | `boolean` | `false` |
| nativeType | 原生 type | `button \| submit \| reset` | `button` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击时触发 | `MouseEvent` |
