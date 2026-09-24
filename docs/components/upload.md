# Upload 上传

用于选择并管理上传文件（本地文件管理，不含实际上传请求）。

## 基础用法

点击触发区选择文件，选择后展示文件列表（名称、大小），可移除。

```vue
<template>
  <shs-upload v-model="files" multiple />
</template>
```

## 多选与类型限制

`multiple` 支持多选；`accept` 限制可选择文件类型。

```vue
<shs-upload v-model="files" multiple accept="image/*" tip="支持上传图片" />
```

## 禁用

设置 `disabled` 后不可选择与移除。

```vue
<shs-upload v-model="files" disabled />
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 文件列表（v-model） | `UploadFile[]` | `[]` |
| multiple | 是否支持多选 | `boolean` | `false` |
| accept | 接受的文件类型 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| tip | 触发区提示文字 | `string` | `'点击或拖拽文件到此处上传'` |
| listType | 列表样式 | `'text' \| 'picture'` | `'text'` |

| 事件 | 说明 |
| --- | --- |
| update:modelValue | 文件列表变化 |
| change | 选择文件后（参数为新列表） |
| remove | 移除文件（参数为 uid） |

> UploadFile：`{ uid, name, size, raw?, status?, url? }`，`url` 为图片文件的本地预览地址。
