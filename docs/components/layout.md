# Layout 布局

基于 24 栅格的响应式布局容器：`Row` 行 + `Col` 列。

## 基础用法

```vue
<template>
  <shs-row :gutter="16">
    <shs-col :span="8">span 8</shs-col>
    <shs-col :span="8">span 8</shs-col>
    <shs-col :span="8">span 8</shs-col>
  </shs-row>
</template>
```

## 排列与偏移

`justify` 控制水平排列，`offset` 控制列偏移。

```vue
<template>
  <shs-row justify="center">
    <shs-col :span="8">居中</shs-col>
  </shs-row>
  <shs-row :gutter="12">
    <shs-col :span="10" :offset="2">offset 2</shs-col>
  </shs-row>
</template>
```

## Row API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 栅格间隔（px） | `number` | `0` |
| justify | 水平排列 | `start \| end \| center \| space-between \| space-around` | `start` |
| align | 垂直对齐 | `top \| middle \| bottom` | `top` |

## Col API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 栅格占据数（1~24） | `number` | `24` |
| offset | 左侧偏移数（1~24） | `number` | `0` |
