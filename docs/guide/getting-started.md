# 快速上手

## 安装

```bash
pnpm add @shs-ui/components
```

## 全量引入

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ShsUI from '@shs-ui/components'
import '@shs-ui/theme'
import '@shs-ui/components/style'

createApp(App).use(ShsUI).mount('#app')
```

## 按需引入

配合 `unplugin-vue-components` 使用（Resolver 将在 M2 提供）：

```ts
import { Components } from 'unplugin-vue-components'
import { ShsUIResolver } from '@shs-ui/components/resolver'

export default {
  plugins: [
    Components({ resolvers: [ShsUIResolver()] }),
  ],
}
```

## 使用组件

```vue
<template>
  <shs-button type="primary">确定</shs-button>
</template>
```
