# Layout 布局

提供两类布局能力：**容器布局**（`Layout` + `Header` + `Aside` + `Content` + `Footer`）用于搭建页面整体骨架；**栅格布局**（`Row` + `Col`，基于 24 栅格）用于内容区内部的响应式排布。

## 容器布局

`shs-layout` 作为布局容器，`shs-header` / `shs-aside` / `shs-content` / `shs-footer` 分别对应顶栏、侧边栏、内容区与页脚。默认纵向（上下）排列；当直接子级包含 `shs-aside` 时自动切换为横向（左右）排列。

### 基础用法（上下结构）

```vue
<template>
  <shs-layout>
    <shs-header>Header</shs-header>
    <shs-content>Content</shs-content>
    <shs-footer>Footer</shs-footer>
  </shs-layout>
</template>
```

### 侧边栏结构

```vue
<template>
  <shs-layout>
    <shs-header>Header</shs-header>
    <shs-layout>
      <shs-aside :width="220">Aside</shs-aside>
      <shs-content>Content</shs-content>
    </shs-layout>
    <shs-footer>Footer</shs-footer>
  </shs-layout>
</template>
```

### 自定义高度 / 宽度

```vue
<template>
  <shs-layout>
    <shs-header :height="48">Header</shs-header>
    <shs-layout>
      <shs-aside width="20%">Aside</shs-aside>
      <shs-content>Content</shs-content>
    </shs-layout>
  </shs-layout>
</template>
```

> 提示：`shs-content` 与 `shs-aside` 默认 `overflow-y: auto`，可将整体高度限制在视口内并独立滚动。容器占满父级宽高，请为最外层 `shs-layout` 的父级设定高度（如 `height: 100vh`）。

### 侧边栏全高布局

左侧 `Aside` 贯通顶部与底部（全高），右侧从上到下依次为 `Header` / `Content` / `Footer`。外层 `Layout` 直接放置 `Aside` 触发左右布局，右侧再用一个纵向 `Layout` 承载 Header / Content / Footer。

```vue
<template>
  <shs-layout>
    <shs-aside :width="220">Aside（全高）</shs-aside>
    <shs-layout>
      <shs-header>Header</shs-header>
      <shs-content>Content</shs-content>
      <shs-footer>Footer</shs-footer>
    </shs-layout>
  </shs-layout>
</template>
```

### 头部全宽布局

`Header` 贯通顶部（全宽），其下左侧为 `Aside`，右侧从上到下依次为 `Content` / `Footer`。外层 `Layout` 纵向放置 `Header`，下方内层 `Layout` 横排放 `Aside` 与右侧纵向 `Layout`。

```vue
<template>
  <shs-layout>
    <shs-header>Header（全宽）</shs-header>
    <shs-layout>
      <shs-aside :width="220">Aside</shs-aside>
      <shs-layout>
        <shs-content>Content</shs-content>
        <shs-footer>Footer</shs-footer>
      </shs-layout>
    </shs-layout>
  </shs-layout>
</template>
```

## Layout API

`shs-layout`：无 Props，通过默认插槽承载子组件；检测到 `ShsAside` 子组件时自动切换为左右布局。

## Header / Footer API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 高度，数字（px）或带单位的字符串 | `number \| string` | `60` |

## Aside API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 宽度，数字（px）或带单位的字符串 | `number \| string` | `200` |

## Content API

`shs-content`：无 Props，弹性撑满剩余空间，通过默认插槽承载内容。

***

## 栅格布局

基于 24 栅格的响应式布局容器：`Row` 行 + `Col` 列。

### 基础用法

```vue
<template>
  <shs-row :gutter="16">
    <shs-col :span="8">span 8</shs-col>
    <shs-col :span="8">span 8</shs-col>
    <shs-col :span="8">span 8</shs-col>
  </shs-row>
</template>
```

### 排列与偏移

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
