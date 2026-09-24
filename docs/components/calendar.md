# Calendar 日历

月视图日历面板，支持对待办事项进行添加、编辑、删除与显示。

## 基础用法

`v-model` 为选中日期，`v-model:events` 双向绑定待办数组。

```vue
<template>
  <shs-calendar v-model="date" v-model:events="events" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref('')
const events = ref([
  { id: '1', date: '2026-09-23', title: '开会' },
  { id: '2', date: '2026-09-24', title: '出差' },
])
</script>
```

## 只读模式

设置 `editable=false` 隐藏添加与删除，仅用于展示。

```vue
<shs-calendar :events="events" :editable="false" />
```

## 事件

通过事件监听待办增删改（同时会 `update:events` 同步数组）：

```vue
<shs-calendar
  v-model:events="events"
  @add="(e) => handleAdd(e)"
  @update="(e) => handleUpdate(e)"
  @remove="(id) => handleRemove(id)"
/>
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| events | 待办事项（v-model:events） | `CalendarEvent[]` | `[]` |
| modelValue | 选中日期（v-model） | `string` | 今天 |
| editable | 是否可增删改 | `boolean` | `true` |

| CalendarEvent | 说明 | 类型 |
| --- | --- | --- |
| id | 唯一标识 | `string` |
| date | 所属日期（YYYY-MM-DD） | `string` |
| title | 待办内容 | `string` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:events | 待办数组变化 | `CalendarEvent[]` |
| update:modelValue | 选中日期变化 | `string` |
| add | 新增待办 | `CalendarEvent` |
| update | 编辑待办 | `CalendarEvent` |
| remove | 删除待办 | `id: string` |

面板为大尺寸月视图，天格之间无间隔、无圆角，形成连续网格。每个天格按「上方农历/节气、中间公历日期、底部待办」排版：农历统一显示「X月X日」（如「八月十三」），若当天为二十四节气则优先显示节气名并高亮（如「秋分」）；公历每月 1 日显示「M月D日」，其余显示「D日」；天格内直接展示该日待办（最多两条，超出显示「更多N」）。点击任一天弹出浮动面板，浮层展示该日详细农历（如「农历丙午年（马）· 八月十三」）与二十四节气（如「· 秋分」），可添加、编辑、删除待办，右上角提供关闭按钮。首尾的空（补位）格会以浅色显示上一月与下一月的日期。
