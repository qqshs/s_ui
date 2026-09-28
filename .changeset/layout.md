---
'@shs-ui/components': minor
---

新增容器布局组件族：`Layout`（`ShsLayout`）、`Header`（`ShsHeader`）、`Aside`（`ShsAside`）、`Content`（`ShsContent`）、`Footer`（`ShsFooter`）。`Layout` 默认纵向排列，检测到 `Aside` 子组件时自动切换为左右布局；`Header`/`Footer` 支持 `height`，`Aside` 支持 `width`（数字或带单位字符串）。均通过 `ShsLayout` 等全局注册与按需引入。
