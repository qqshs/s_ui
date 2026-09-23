# Icon 图标

基于 `@shs-ui/icons` 图标包的内置 SVG 图标组件。

## 基础用法

```vue
<template>
  <shs-icon name="check" />
  <shs-icon name="close" />
</template>
```

## 尺寸与颜色

`size` 支持数字（自动转 px）或带单位字符串；`color` 默认继承 `currentColor`。

```vue
<template>
  <shs-icon name="info" :size="24" color="#3b82f6" />
  <shs-icon name="warning" :size="20" />
</template>
```

## 图标清单

当前内置：`arrow-left`、`arrow-right`、`close`、`check`、`info`、`warning`、`search`。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 图标名称 | `IconName`（必填） | — |
| size | 尺寸 | `number \| string` | `16` |
| color | 颜色 | `string` | `currentColor` |
