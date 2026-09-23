# DateTimePicker 日期时间选择

日历面板 + 时分选择，值格式为 `YYYY-MM-DD HH:mm`。

## 基础用法

```vue
<template>
  <shs-date-time-picker v-model="datetime" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const datetime = ref('2026-09-23 08:30')
</script>
```

## 属性与事件

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 选中日期时间（v-model） | `string` | `''` |
| placeholder | 占位文本 | `string` | `请选择日期时间` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 确定/清空 | `string` |
| change | 确定日期时间 | `string` |
| clear | 清空 | — |

面板中选择日期、时分后点击「确定」提交完整值。
