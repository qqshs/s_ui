# ProTable 高级表格

集搜索区 + 表格 + 分页于一体的中后台列表组件。

## 基础用法

`columns` 定义列，`dataSource` 传入数据，`searchFields` 声明搜索字段，内置分页。

```vue
<template>
  <shs-pro-table
    v-model:currentPage="page"
    :columns="columns"
    :data-source="dataSource"
    :search-fields="searchFields"
    :total="total"
    border
    @search="onSearch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
const total = ref(2)
const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
]
const dataSource = [
  { name: '张三', age: 28 },
  { name: '李四', age: 32 },
]
const searchFields = [{ prop: 'keyword', label: '关键词' }]

const onSearch = (params) => {
  console.log('查询条件：', params)
  // 在此请求数据并更新 dataSource / total
}
</script>
```

## 搜索字段

`searchFields` 支持 `input` 与 `select` 两种控件，`select` 配合 `options`。

```ts
const searchFields = [
  { prop: 'keyword', label: '关键词' },
  { prop: 'status', label: '状态', type: 'select', options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
]
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列定义 | `TableColumn[]` | `[]` |
| dataSource | 表格数据 | `Record<string, unknown>[]` | `[]` |
| searchFields | 搜索区字段 | `ProSearchField[]` | `[]` |
| showSearch | 是否显示搜索区 | `boolean` | `true` |
| showPagination | 是否显示分页 | `boolean` | `true` |
| currentPage | 当前页码（v-model:currentPage） | `number` | `1` |
| pageSize | 每页条数 | `number` | `10` |
| total | 数据总条数 | `number` | `0` |
| border | 是否显示边框 | `boolean` | `false` |
| striped | 是否斑马纹 | `boolean` | `false` |

| 事件 | 说明 |
| --- | --- |
| update:currentPage | 页码变化 |
| search | 点击查询（参数：搜索条件对象） |
| reset | 点击重置 |
