# shs\_ui

基于 Vue 3 的企业级前端 UI 框架（monorepo）。

## 包



| 包                    | 说明               |
| -------------------- | ---------------- |
| `@shs-ui/components` | 组件库（组件前缀 `SHS-`） |
| `@shs-ui/theme`      | 主题与设计令牌（CSS 变量）  |
| `@shs-ui/utils`      | 工具函数库            |
| `@shs-ui/icons`      | 内置图标             |

## 技术栈

Vue 3.4・Vite 5・TypeScript 5・SCSS（CSS 变量主题）・Vitest・VitePress・pnpm workspace

## 快速开始



```
\# 安装依赖

pnpm install

\# 启动组件调试环境

pnpm dev

\# 启动文档站

pnpm docs:dev

\# 单元测试

pnpm test

\# 构建组件库

pnpm build

\# 代码检查

pnpm lint
```

## 目录结构



```
shs\_ui/

├── packages/

│   ├── components/   # 组件库

│   ├── theme/        # 主题令牌

│   ├── utils/        # 工具函数

│   └── icons/        # 图标

├── docs/             # VitePress 文档站

├── playground/       # 组件调试环境

├── .changeset/       # 版本发布

└── .github/          # CI 流水线
```

## 文档

设计文档见 `shs_ui_design.md`（已评审确认，进入 M1 工程搭建阶段）。