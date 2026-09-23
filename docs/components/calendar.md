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
<shs-calendar :events="events" editable="false" />
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

面板左侧为月视图日历（天格含待办数量徽标），右侧为选中日期待办区：输入框添加、点击标题编辑、删除按钮移除。
