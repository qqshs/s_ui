// shs_ui 工具函数库 —— 纯函数、零副作用

/** 判断是否为有效且非空的字符串 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/** 判断值是否为 null 或 undefined */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

/** 数字千分位格式化 */
export function formatNumber(value: number): string {
  return value.toLocaleString('zh-CN')
}

/** 简单深拷贝（仅适用于 JSON 安全对象） */
export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

let uid = 0

/** 生成全局唯一 id（组件实例用） */
export function genId(prefix = 'shs'): string {
  uid += 1
  return `${prefix}-${Date.now().toString(36)}-${uid}`
}

/** 驼峰转连字符：camelCase -> camel-case */
export function hyphenate(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

export { solarToLunar, lunarMonthName, lunarDayName } from './lunar'
export type { LunarDate } from './lunar'
