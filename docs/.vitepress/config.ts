import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'shs_ui',
  description: '基于 Vue 3 的企业级前端 UI 框架',
  vite: {
    css: {
      preprocessorOptions: {
        scss: { api: 'modern' },
      },
    },
  },
  themeConfig: {
    logo: 'https://vitejs.dev/logo.svg',
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/guide/introduction' },
          { text: '快速上手', link: '/guide/getting-started' },
        ],
      },
      {
        text: '组件',
        items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Icon 图标', link: '/components/icon' },
          { text: 'Tag 标签', link: '/components/tag' },
          { text: 'Card 卡片', link: '/components/card' },
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Form 表单', link: '/components/form' },
          { text: 'Modal 弹窗', link: '/components/modal' },
          { text: 'Message 消息', link: '/components/message' },
          { text: 'Table 表格', link: '/components/table' },
          { text: 'Pagination 分页', link: '/components/pagination' },
          { text: 'Menu 菜单', link: '/components/menu' },
          { text: 'Radio 单选框', link: '/components/radio' },
          { text: 'Checkbox 多选框', link: '/components/checkbox' },
          { text: 'DatePicker 日期', link: '/components/date-picker' },
          { text: 'DateTimePicker 日期时间', link: '/components/date-time-picker' },
          { text: 'Calendar 日历', link: '/components/calendar' },
          { text: 'Layout 布局', link: '/components/layout' },
          { text: 'Empty 空状态', link: '/components/empty' },
          { text: 'Tabs 标签页', link: '/components/tabs' },
          { text: 'Tree 树形控件', link: '/components/tree' },
          { text: 'Upload 上传', link: '/components/upload' },
          { text: 'ProForm 高级表单', link: '/components/pro-form' },
          { text: 'ProTable 高级表格', link: '/components/pro-table' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/' }],
  },
})
