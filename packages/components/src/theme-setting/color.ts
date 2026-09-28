// 主题色工具：十六进制颜色解析与明暗混合（用于主色派生 hover / active）

const HEX_RE = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i

/** 解析 #rgb / #rrggbb / rgb → 归一化为 #rrggbb，非法输入返回 fallback */
export function normalizeHex(hex: string, fallback = '#3b82f6'): string {
  if (typeof hex !== 'string') return fallback
  const m = HEX_RE.exec(hex.trim())
  if (!m) return fallback
  let h = m[1]
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('')
  return `#${h.toLowerCase()}`
}

/** #rrggbb → [r, g, b]（0-255） */
function hexToRgb(hex: string): [number, number, number] {
  const h = normalizeHex(hex)
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
}

/** 按比例向白色（amount>0）或黑色（amount<0）混合，amount ∈ [-1, 1] */
export function shiftColor(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex)
  const t = amount >= 0 ? 255 : 0
  const a = Math.min(1, Math.abs(amount))
  const mix = (c: number) => Math.round(c + (t - c) * a)
  const toHex = (c: number) => c.toString(16).padStart(2, '0')
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`
}

/** 变亮（向白色混合） */
export function lighten(hex: string, ratio = 0.12): string {
  return shiftColor(hex, ratio)
}

/** 变暗（向黑色混合） */
export function darken(hex: string, ratio = 0.12): string {
  return shiftColor(hex, -ratio)
}

/** 十六进制颜色是否近似于给定颜色（用于选中态判断） */
export function isSameHex(a: string, b: string): boolean {
  return normalizeHex(a) === normalizeHex(b)
}
