# Form 表单

由 `Form` + `FormItem` 组合的表单，支持统一数据对象与规则校验。

## 基础用法

```vue
<template>
  <shs-form ref="formRef" :model="model" :rules="rules" label-width="80px">
    <shs-form-item label="姓名" prop="name">
      <shs-input v-model="model.name" placeholder="请输入姓名" />
    </shs-form-item>
    <shs-form-item label="手机号" prop="phone">
      <shs-input v-model="model.phone" placeholder="请输入手机号" />
    </shs-form-item>
    <shs-button type="primary" @click="submit">提交</shs-button>
  </shs-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const model = reactive({ name: '', phone: '' })
const formRef = ref()
const rules = {
  name: { required: true, message: '请输入姓名' },
  phone: { min: 11, message: '手机号长度不足', pattern: /^1\d{10}$/ },
}

const submit = async () => {
  const valid = await formRef.value.validate()
  if (valid) alert('校验通过')
}
</script>
```

## 校验规则

| 字段 | 说明 |
| --- | --- |
| required | 是否必填（空值：undefined / null / ''） |
| pattern | 正则校验（仅对字符串） |
| min / max | 字符串最小 / 最大长度 |
| validator | 自定义校验函数 `(value, model) => boolean \| Promise<boolean>` |
| message | 校验失败提示 |

## Form API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象（必须响应式） | `object` | 必填 |
| rules | 校验规则 | `FormRules` | `{}` |
| labelWidth | 统一标签宽度 | `string` | `''` |

| 方法（ref） | 说明 |
| --- | --- |
| validate | 校验全部字段，返回 `Promise<boolean>` |

## FormItem API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 字段标签 | `string` | `''` |
| prop | 对应 model 字段名 | `string` | `''` |
