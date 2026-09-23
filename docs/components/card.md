# Card 卡片

通用卡片容器，承载内容区块。

## 基础用法

```vue
<template>
  <shs-card title="标题">
    <p>卡片内容。</p>
  </shs-card>
</template>
```

## 插槽与阴影

- `header` 插槽优先于 `title` 属性
- `footer` 插槽渲染底部操作区
- `shadow` 控制阴影时机：`never` / `hover` / `always`

```vue
<template>
  <shs-card shadow="hover">
    <template #header>自定义头部</template>
    <p>内容</p>
    <template #footer>
      <shs-button type="primary" size="small">确认</shs-button>
    </template>
  </shs-card>
</template>
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | `string` | `''` |
| shadow | 阴影时机 | `never \| hover \| always` | `always` |

| 插槽 | 说明 |
| --- | --- |
| default | 内容区 |
| header | 头部（优先于 title） |
| footer | 底部操作区 |
