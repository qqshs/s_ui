# ProForm 高级表单

基于 schema 声明式渲染的表单，内置必填校验与提交/重置。

## 基础用法

通过 `fields` 声明字段，自动渲染对应控件（输入框 / 下拉 / 文本域 / 数字）。

```vue
<template>
  <shs-pro-form :fields="fields" @submit="onSubmit" style="width: 480px" />
</template>

<script setup lang="ts">
const fields = [
  { prop: 'name', label: '姓名', required: true },
  { prop: 'city', label: '城市', type: 'select', options: [{ label: '北京', value: 'bj' }, { label: '上海', value: 'sh' }] },
  { prop: 'remark', label: '备注', type: 'textarea' },
]

const onSubmit = (data, valid) => {
  if (!valid) return
  console.log(data)
}
</script>
```

## 字段类型

| type | 控件 |
| --- | --- |
| `input`（默认） | 输入框 |
| `number` | 数字输入框 |
| `select` | 下拉选择（配合 `options`） |
| `textarea` | 文本域 |

## 校验

`required: true` 的字段为空时提交会报错并阻止有效提交，`submit` 事件的第二个参数 `valid` 表示是否校验通过。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fields | 字段 schema | `ProField[]` | `[]` |
| modelValue | 表单数据（v-model） | `Record<string, unknown>` | `{}` |
| labelWidth | 标签宽度 | `string \| number` | `undefined` |
| disabled | 是否禁用 | `boolean` | `false` |
| submitText | 提交按钮文字 | `string` | `'提交'` |
| showReset | 是否显示重置按钮 | `boolean` | `true` |

| 事件 | 说明 |
| --- | --- |
| update:modelValue | 表单数据变化 |
| submit | 点击提交（参数：数据、是否校验通过） |
