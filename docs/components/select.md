# Select 下拉选择器

通过 `v-model` 双向绑定的下拉选择器。

## 基础用法

```vue
<template>
  <shs-select v-model="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
]
</script>
```

## 可清空 / 禁用 / 尺寸

```vue
<template>
  <shs-select v-model="value" :options="options" clearable />
  <shs-select v-model="value" :options="options" disabled />
  <shs-select v-model="value" :options="options" size="small" />
</template>
```

支持选项级 `disabled`（`{ label, value, disabled }`）。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 选中值（v-model） | `string \| number` | `''` |
| options | 选项列表 | `SelectOption[]` | `[]` |
| placeholder | 占位文本 | `string` | `请选择` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| size | 尺寸 | `small \| medium \| large` | `medium` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中变化 | `string \| number` |
| change | 选中变化（仅选项选择时） | `string \| number` |
| clear | 点击清空 | — |
