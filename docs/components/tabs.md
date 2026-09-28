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

## 文件夹式

设置 `type="folder"` 使用文件夹样式的标签，标签相互堆叠、当前激活项浮于最上层并与内容区融为一体。

```vue
<shs-tabs v-model="active" type="folder" :tabs="tabs" />
```

## 可关闭

设置 `closable` 后，标签右侧出现关闭按钮；点击后触发 `close` 事件，由父组件移除对应项。也可为单个标签单独设置 `closable` 覆盖全局配置。

```vue
<template>
  <shs-tabs v-model="active" :tabs="tabs" closable @close="removeTab" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref('a')
const tabs = ref([
  { name: 'a', label: '标签A' },
  { name: 'b', label: '标签B' },
  { name: 'c', label: '标签C' },
])

const removeTab = (name: string) => {
  const i = tabs.value.findIndex((t) => t.name === name)
  if (i > -1) {
    tabs.value.splice(i, 1)
    if (active.value === name) active.value = tabs.value[i]?.name ?? ''
  }
}
</script>
```

也可只在单个标签上开启：`{ name: 'a', label: '标签A', closable: true }`。

## 溢出滑动

当标签数量超过容器宽度时，导航两侧自动出现左右滑动按钮，点击可逐段滚动查看被遮挡的标签。

## API

| 属性       | 说明                                              | 类型                           | 默认值   |
| ---------- | ------------------------------------------------- | ------------------------------ | -------- |
| modelValue | 当前激活的 tab 名称（v-model）                    | `string`                       | `''`     |
| tabs       | 选项卡列表                                        | `TabItem[]`                    | `[]`     |
| type       | 样式类型                                          | `'line' \| 'card' \| 'folder'` | `'line'` |
| closable   | 是否显示关闭按钮（可被单个 tab 的 closable 覆盖） | `boolean`                      | `false`  |

### TabItem

| 属性     | 说明                                  | 类型      | 默认值  |
| -------- | ------------------------------------- | --------- | ------- |
| name     | 唯一标识                              | `string`  | -       |
| label    | 显示文本                              | `string`  | -       |
| disabled | 是否禁用                              | `boolean` | `false` |
| closable | 是否可关闭（优先级高于全局 closable） | `boolean` | -       |

| 事件              | 说明                          |
| ----------------- | ----------------------------- |
| update:modelValue | 激活项变化                    |
| change            | 激活项变化                    |
| close             | 点击关闭按钮，参数为标签 name |

| 插槽          | 说明       |
| ------------- | ---------- |
| `pane-{name}` | 各面板内容 |
