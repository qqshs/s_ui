# Tabs 标签页

用于在同一块区域内切换多个内容面板。

## 基础用法

`tabs` 传入选项卡列表，`v-model` 绑定当前激活项，内容通过 `#pane-{name}` 插槽提供。

```vue
<template>
  <shs-tabs v-model="active" :tabs="tabs">
    <template #pane-a>面板 A 内容</template>
    <template #pane-b>面板 B 内容</template>
  </shs-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('a')
const tabs = [
  { name: 'a', label: '标签A' },
  { name: 'b', label: '标签B' },
]
</script>
```

## 禁用项

`tabs` 项设置 `disabled: true` 后不可点击切换。

```ts
const tabs = [
  { name: 'a', label: '标签A' },
  { name: 'b', label: '标签B', disabled: true },
]
```

## 卡片式

设置 `type="card"` 使用卡片样式的标签。

```vue
<shs-tabs v-model="active" type="card" :tabs="tabs" />
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前激活的 tab 名称（v-model） | `string` | `''` |
| tabs | 选项卡列表 | `TabItem[]` | `[]` |
| type | 样式类型 | `'line' \| 'card'` | `'line'` |

| 事件 | 说明 |
| --- | --- |
| update:modelValue | 激活项变化 |
| change | 激活项变化 |

| 插槽 | 说明 |
| --- | --- |
| `pane-{name}` | 各面板内容 |
