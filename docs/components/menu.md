# Menu 菜单

基于数据驱动的菜单，支持垂直/水平布局、递归子菜单、禁用与选中高亮。

## 基础用法

```vue
<template>
  <shs-menu :items="items" mode="vertical" @select="handleSelect" />
</template>

<script setup lang="ts">
const items = [
  { label: '首页', key: 'home' },
  {
    label: '组件',
    key: 'components',
    children: [
      { label: '按钮', key: 'button' },
      { label: '表格', key: 'table' },
    ],
  },
  { label: '禁用项', key: 'disabled', disabled: true },
]
const handleSelect = (key: string) => console.log('选中', key)
</script>
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单数据 | `MenuItem[]` | `[]` |
| mode | 布局方向 | `vertical \| horizontal` | `vertical` |
| defaultActive | 默认激活项 key | `string` | `''` |

| MenuItem | 说明 | 类型 |
| --- | --- | --- |
| label | 标题 | `string` |
| key | 唯一标识 | `string` |
| disabled | 是否禁用 | `boolean` |
| children | 子菜单 | `MenuItem[]` |

| 事件 | 说明 | 参数 |
| --- | --- | --- |
| select | 选中菜单项 | `key: string` |
