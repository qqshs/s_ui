// shs_ui 图标包（骨架）—— 提供图标名称清单与 SVG path 数据
// M2 阶段在此之上封装 <shs-icon> 渲染组件

export const iconNames = [
  'arrow-left',
  'arrow-right',
  'close',
  'check',
  'info',
  'warning',
  'search',
] as const

export type IconName = (typeof iconNames)[number]

// SVG path（stroke 风格，尺寸统一 24x24，stroke-width=2）
export const iconPaths: Record<IconName, string> = {
  'arrow-left': 'M15 18l-6-6 6-6',
  'arrow-right': 'M9 18l6-6-6-6',
  close: 'M6 6l12 12M18 6L6 18',
  check: 'M20 6L9 17l-5-5',
  info: 'M12 8h.01M12 12v4M12 4a8 8 0 100 16 8 8 0 000-16z',
  warning: 'M12 9v4M12 17h.01M10.3 3.9l-8 14A2 2 0 004 21h16a2 2 0 001.7-3.1l-8-14a2 2 0 00-3.4 0z',
  search: 'M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z',
}
