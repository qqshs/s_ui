# Radio 单选框

`RadioGroup` + `Radio` 组合实现互斥单选，也支持独立使用。

## 基础用法

```vue
<template>
  <shs-radio-group v-model="gender">
    <shs-radio value="male" label="男" />
    <shs-radio value="female" label="女" />
  </shs-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const gender = ref('male')
</script>
```

## 独立使用 / 禁用

```vue
<shs-radio v-model="agree" :value="true" label="同意协议" />
<shs-radio value="x" label="禁用项" disabled />
```

## API

### RadioGroup

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前选中值（v-model） | `string \| number \| boolean` | `''` |
| disabled | 是否整体禁用 | `boolean` | `false` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中变化 | 选中值 |
| change | 选中变化 | 选中值 |

### Radio

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 选中值（独立使用） | `string \| number \| boolean` | — |
| value | 选项值 | `string \| number \| boolean` | 必填 |
| label | 显示文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| name | 原生 name | `string` | `''` |
