import type { App, Plugin } from 'vue'

type SFCWithInstall<T> = T & Plugin

/**
 * 为单文件组件附加 install 方法，使其可通过 app.use() 全局注册，
 * 或配合 unplugin-vue-components 按需注册。
 */
export function withInstall<T>(comp: T): SFCWithInstall<T> {
  ;(comp as SFCWithInstall<T>).install = (app: App) => {
    const name = (comp as unknown as { name?: string }).name
    if (name) app.component(name, comp as never)
  }
  return comp as SFCWithInstall<T>
}
