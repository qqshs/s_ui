<script setup lang="ts">
import { ShsButton } from '@shs-ui/components'

const handleClick = () => alert('shs_ui 按钮点击')
</script>

<template>
  <div class="page">
    <h1>shs_ui Playground</h1>
    <p>组件开发调试环境（M1 骨架）</p>
    <div class="row">
      <shs-button @click="handleClick">默认按钮</shs-button>
      <shs-button type="primary">主要按钮</shs-button>
      <shs-button type="success">成功</shs-button>
      <shs-button type="warning">警告</shs-button>
      <shs-button type="danger" disabled>危险(禁用)</shs-button>
    </div>
    <div class="row">
      <shs-button size="small" type="primary">小</shs-button>
      <shs-button type="primary">中</shs-button>
      <shs-button size="large" type="primary">大</shs-button>
    </div>
  </div>
</template>

<style>
.page {
  padding: 32px;
  font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
.row {
  display: flex;
  gap: 12px;
  margin: 16px 0;
}
</style>
