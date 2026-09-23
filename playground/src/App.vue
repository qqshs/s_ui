<script setup lang="ts">
const handleClick = () => alert('shs_ui 按钮点击')
</script>

<template>
  <div class="page">
    <h1>shs_ui Playground</h1>
    <p>M2 第一批组件：Button / Icon / Tag / Card / Input / Row / Col</p>

    <h2>Button</h2>
    <div class="row">
      <shs-button @click="handleClick"> 默认按钮 </shs-button>
      <shs-button type="primary"> 主要按钮 </shs-button>
      <shs-button type="success"> 成功 </shs-button>
      <shs-button type="warning"> 警告 </shs-button>
      <shs-button type="danger" disabled> 危险(禁用) </shs-button>
      <shs-button type="primary" loading> 加载中 </shs-button>
      <shs-button type="primary" round> 圆角 </shs-button>
    </div>

    <h2>Icon</h2>
    <div class="row">
      <shs-icon name="arrow-left" :size="18" />
      <shs-icon name="arrow-right" :size="18" />
      <shs-icon name="close" :size="18" />
      <shs-icon name="check" :size="18" color="#22c55e" />
      <shs-icon name="info" :size="18" color="#3b82f6" />
      <shs-icon name="warning" :size="18" color="#f59e0b" />
      <shs-icon name="search" :size="18" />
    </div>

    <h2>Tag</h2>
    <div class="row">
      <shs-tag> 默认 </shs-tag>
      <shs-tag type="primary"> 主要 </shs-tag>
      <shs-tag type="success"> 成功 </shs-tag>
      <shs-tag type="warning"> 警告 </shs-tag>
      <shs-tag type="danger"> 危险 </shs-tag>
      <shs-tag type="primary" closable> 可关闭 </shs-tag>
      <shs-tag type="primary" size="small"> 小号 </shs-tag>
    </div>

    <h2>Card</h2>
    <div class="cards">
      <shs-card title="卡片标题">
        <p>卡片内容区域，可自由放置任意内容。</p>
        <template #footer>
          <shs-button type="primary" size="small"> 操作 </shs-button>
        </template>
      </shs-card>
      <shs-card title="hover 阴影" shadow="hover">
        <p>鼠标悬停显示阴影。</p>
      </shs-card>
    </div>

    <h2>Input</h2>
    <div class="row">
      <shs-input placeholder="请输入内容" clearable style="width: 260px" />
      <shs-input placeholder="禁用状态" disabled style="width: 200px" />
      <shs-input type="password" placeholder="密码" style="width: 220px" />
    </div>

    <h2>Layout（Row / Col）</h2>
    <div class="row">
      <shs-row :gutter="16" style="width: 100%">
        <shs-col :span="8">
          <div class="cell">span 8</div>
        </shs-col>
        <shs-col :span="8">
          <div class="cell">span 8</div>
        </shs-col>
        <shs-col :span="8">
          <div class="cell">span 8</div>
        </shs-col>
        <shs-col :span="6">
          <div class="cell">span 6</div>
        </shs-col>
        <shs-col :span="6">
          <div class="cell">span 6</div>
        </shs-col>
        <shs-col :span="6">
          <div class="cell">span 6</div>
        </shs-col>
        <shs-col :span="6">
          <div class="cell">span 6</div>
        </shs-col>
      </shs-row>
    </div>
  </div>
</template>

<style>
.page {
  padding: 32px;
  font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
.page h2 {
  margin-top: 24px;
}
.row {
  display: flex;
  gap: 12px;
  margin: 12px 0;
  align-items: center;
  flex-wrap: wrap;
}
.cards {
  display: grid;
  grid-template-columns: repeat(2, 280px);
  gap: 16px;
}
.cell {
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  border-radius: 4px;
  padding: 16px 0;
  text-align: center;
  font-size: 13px;
  color: #4f46e5;
}
</style>
