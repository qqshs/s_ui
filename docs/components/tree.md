# Tree 树形控件

用于展示具有层级关系的数据。

## 基础用法

`data` 传入树形数据，节点可包含 `children` 形成层级。

```vue
<template>
  <shs-tree :data="treeData" />
</template>

<script setup lang="ts">
const treeData = [
  { label: '节点A', children: [{ label: 'A-1' }, { label: 'A-2' }] },
  { label: '节点B' },
]
</script>
```

## 默认展开

设置 `default-expand-all` 默认展开所有含子节点的项。

```vue
<shs-tree :data="treeData" default-expand-all />
```

## 选中

`v-model` 绑定当前选中节点标识（`value`，缺省用 `label`），点击节点触发 `select` 事件。

```vue
<shs-tree v-model="selected" :data="treeData" />
```

## 禁用项

节点设置 `disabled: true` 后不可选中。

```ts
const treeData = [{ label: '节点B', disabled: true }]
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 树形数据 | `TreeNode[]` | `[]` |
| modelValue | 当前选中节点标识（v-model） | `string` | `''` |
| defaultExpandAll | 是否默认展开所有含子节点的项 | `boolean` | `false` |

| 事件 | 说明 |
| --- | --- |
| update:modelValue | 选中节点变化 |
| select | 点击节点（参数为节点数据） |
