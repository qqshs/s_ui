# s_ui

基于 **Vue 3** 的企业级前端 UI 框架。单一包，包含组件库、主题令牌、工具函数与内置图标。

## 安装

```bash
npm i @qqshs0/s_ui
# 或
pnpm add @qqshs0/s_ui
```

> 需要 Vue 3.4+（peer 依赖，需自行安装）。

## 快速开始

```ts
import { createApp } from 'vue'
import App from './App.vue'
import S_UI from '@qqshs0/s_ui'
import '@qqshs0/s_ui/style'

createApp(App).use(S_UI).mount('#app')
```

按需引入单个组件：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { ShsButton, ShsInput } from '@qqshs0/s_ui'
import '@qqshs0/s_ui/style'

const app = createApp(App)
app.use(ShsButton)
app.use(ShsInput)
app.mount('#app')
```

## 组件列表

| 类别 | 组件 |
| --- | --- |
| 基础 | ShsButton、ShsIcon、ShsTag、ShsCard、ShsInput、ShsRow、ShsCol、ShsEmpty |
| 表单 | ShsForm、ShsFormItem、ShsSelect、ShsRadio、ShsRadioGroup、ShsCheckbox、ShsCheckboxGroup、ShsUpload |
| 数据展示 | ShsTable、ShsProTable、ShsTree、ShsCalendar、ShsDatePicker、ShsDateTimePicker、ShsPagination |
| 反馈 | ShsModal、ShsMessage（含 `message` 命令式 API） |
| 布局 | ShsLayout、ShsHeader、ShsAside、ShsContent、ShsFooter、ShsMenu、ShsTabs |
| 业务 | ShsProForm、ShsThemeSetting、ShsWatermark |

## 全局安装

```ts
import S_UI from '@qqshs0/s_ui'
app.use(S_UI)      // 注册全部组件
```

## 样式

- 组件样式：`import '@qqshs0/s_ui/style'`
- 主题令牌（CSS 变量）：随组件样式一并注入

## License

MIT
