# Empty 空状态

用于列表、表格、页面等数据为空时的占位提示。

## 基础用法

默认展示内置空状态图形与描述文字，可通过 `description` 自定义。

```vue
<template>
  <shs-empty description="暂无数据" />
</template>
```

## 尺寸

通过 `size` 控制整体尺寸：`small` / `medium`（默认）/ `large`。

```vue
<template>
  <shs-empty description="小尺寸" size="small" />
  <shs-empty description="大尺寸" size="large" />
</template>
```

## 图标与自定义图片

传入 `icon`（来自 @shs-ui/icons 的图标名）用图标代替内置图形；传入 `image` 用自定义图片（优先级最高）。

```vue
<template>
  <shs-empty description="搜索无结果" icon="search" />
  <shs-empty description="自定义图片" image="https://example.com/empty.png" />
</template>
```

## 插槽

- `#icon`：自定义图标/图片区域
- `#description`：自定义描述区域（覆盖 `description` 属性）
- 默认插槽：额外的操作区（如"去添加"按钮）

```vue
<template>
  <shs-empty description="没有更多了">
    <template #description>没有更多了</template>
    <shs-button type="primary" size="small">去添加</shs-button>
  </shs-empty>
</template>
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 描述文字 | `string` | `'暂无数据'` |
| icon | 图标名（@shs-ui/icons） | `IconName` | `undefined` |
| image | 自定义图片地址（优先级最高） | `string` | `''` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |

| 插槽 | 说明 |
| --- | --- |
| `icon` | 图标/图片区域 |
| `description` | 描述文字区域 |
| `default` | 额外操作区 |
