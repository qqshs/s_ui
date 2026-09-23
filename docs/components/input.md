# Input 输入框

通过 `v-model` 双向绑定的文本输入框。

## 基础用法

```vue
<template>
  <shs-input v-model="value" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
```

## 可清空与禁用

```vue
<template>
  <shs-input v-model="value" clearable @clear="onClear" />
  <shs-input disabled />
  <shs-input type="password" placeholder="密码" />
</template>
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值（v-model） | `string \| number` | `''` |
| type | 输入框类型 | `text \| password \| number \| email \| tel` | `text` |
| placeholder | 占位文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| size | 尺寸 | `small \| medium \| large` | `medium` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 值变化时触发 | `string \| number` |
| clear | 点击清空时触发 | — |
| focus / blur | 聚焦 / 失焦 | `FocusEvent` |
