# Table 表格

基于列定义与数据对象渲染的数据表格，支持边框、斑马纹、行点击与自定义单元格插槽。

## 基础用法

```vue
<template>
  <shs-table :columns="columns" :data="data" border />
</template>

<script setup lang="ts">
const columns = [
  { label: '姓名', prop: 'name' },
  { label: '年龄', prop: 'age', align: 'center' },
  { label: '城市', prop: 'city' },
]
const data = [
  { name: '张三', age: 18, city: '深圳' },
  { name: '李四', age: 20, city: '广州' },
]
</script>
```

## 自定义单元格

通过 `#cell-{prop}` 具名插槽自定义单元格，插槽作用域含 `row` 与 `value`。

```vue
<shs-table :columns="columns" :data="data">
  <template #cell-name="{ row }">
    <strong>{{ row.name }}</strong>
  </template>
</shs-table>
```

## 行点击

```vue
<shs-table :columns="columns" :data="data" @row-click="(row, index) => handle(row)" />
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列定义 | `TableColumn[]` | `[]` |
| data | 表格数据 | `object[]` | `[]` |
| border | 是否显示边框 | `boolean` | `false` |
| striped | 是否斑马纹 | `boolean` | `false` |

| TableColumn | 说明 | 类型 |
| --- | --- | --- |
| label | 列标题 | `string` |
| prop | 数据字段 | `string` |
| width | 列宽 | `string` |
| align | 对齐 | `left \| center \| right` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| row-click | 点击行 | `(row, index)` |
