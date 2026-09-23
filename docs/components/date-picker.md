# DatePicker 日期选择

日历面板日期选择，值格式为 `YYYY-MM-DD`。

## 基础用法

```vue
<template>
  <shs-date-picker v-model="date" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const date = ref('')
</script>
```

## 属性与事件

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 选中日期（v-model） | `string` | `''` |
| placeholder | 占位文本 | `string` | `请选择日期` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 选择/清空 | `string` |
| change | 选择日期 | `string` |
| clear | 清空 | — |

选择日期通过日历面板点击，支持月份切换。
