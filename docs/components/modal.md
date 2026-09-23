# Modal 弹窗

通过 `v-model` 控制的模态弹窗，使用 Teleport 挂载到 body。

## 基础用法

```vue
<template>
  <shs-button type="primary" @click="visible = true">打开弹窗</shs-button>
  <shs-modal v-model="visible" title="确认操作" @confirm="onConfirm">
    <p>确定要执行该操作吗？</p>
  </shs-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
const onConfirm = () => alert('已确认')
</script>
```

## 自定义

`title` / `footer` 支持插槽自定义；`showFooter` 控制底部按钮区；`width` 控制宽度。

```vue
<shs-modal v-model="visible" width="600px" :show-footer="false">
  <template #title>自定义标题</template>
  <p>自定义内容</p>
</shs-modal>
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 是否显示（v-model） | `boolean` | `false` |
| title | 标题 | `string` | `''` |
| width | 弹窗宽度 | `string` | `520px` |
| showFooter | 是否显示底部按钮区 | `boolean` | `true` |
| confirmText / cancelText | 确认 / 取消文案 | `string` | `确定` / `取消` |
| closeOnClickModal | 点击遮罩是否关闭 | `boolean` | `true` |

| 事件 | 说明 |
| --- | --- |
| update:modelValue | 显隐变化 |
| confirm | 点击确认（默认同时关闭） |
| cancel | 点击取消（默认同时关闭） |
| close | 关闭时触发 |

| 插槽 | 说明 |
| --- | --- |
| default | 内容区 |
| title | 标题（优先于 title 属性） |
| footer | 底部按钮区（优先于默认按钮） |
