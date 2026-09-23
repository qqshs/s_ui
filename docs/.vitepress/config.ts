import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'shs_ui',
  description: '基于 Vue 3 的企业级前端 UI 框架',
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
        items: [{ text: 'Button 按钮', link: '/components/button' }],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/' }],
  },
})
