# Checkbox 多选框

`CheckboxGroup` + `Checkbox` 组合实现多选，也支持独立开关。

## 基础用法

```vue
<template>
  <shs-checkbox-group v-model="hobbies">
    <shs-checkbox value="read" label="阅读" />
    <shs-checkbox value="sport" label="运动" />
    <shs-checkbox value="music" label="音乐" />
  </shs-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const hobbies = ref(['read'])
</script>
```

## 独立使用 / 禁用

```vue
<shs-checkbox v-model="agree" label="我已阅读并同意" />
<shs-checkbox v-model="locked" label="禁用项" disabled />
```

## API

### CheckboxGroup

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 选中值数组（v-model） | `Array` | `[]` |
| disabled | 是否整体禁用 | `boolean` | `false` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选中数组变化 | `Array` |
| change | 选中数组变化 | `Array` |

### Checkbox

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 是否选中（独立使用） | `boolean` | `false` |
| value | 选项值 | `string \| number \| boolean` | — |
| label | 显示文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
