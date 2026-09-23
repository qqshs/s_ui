# Pagination 分页

基于总条数与每页条数渲染页码，通过 `v-model:currentPage` 控制当前页。

## 基础用法

```vue
<template>
  <shs-pagination
    v-model:current-page="page"
    :total="100"
    :page-size="10"
    @change="handlePage"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
const handlePage = (p: number) => console.log('切换到第', p, '页')
</script>
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| currentPage | 当前页码（v-model:currentPage） | `number` | `1` |
| pageSize | 每页条数 | `number` | `10` |
| total | 数据总条数 | `number` | `0` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| update:currentPage | 页码变化 | `number` |
| change | 页码切换 | `number` |
