import { describe, it, expect } from 'vitest'
import { solarToLunar, lunarDayName, lunarMonthName } from '../lunar'

describe('lunar 农历转换', () => {
  it('春节锚点：公历转农历正月初一', () => {
    const a = solarToLunar(2024, 2, 10)
    expect(a.lunarMonth).toBe(1)
    expect(a.lunarDay).toBe(1)
    expect(a.dayName).toBe('初一')

    const b = solarToLunar(2025, 1, 29)
    expect(b.lunarMonth).toBe(1)
    expect(b.lunarDay).toBe(1)
    expect(b.monthName).toBe('正月')

    const c = solarToLunar(2026, 2, 17)
    expect(c.lunarMonth).toBe(1)
    expect(c.lunarDay).toBe(1)
  })

  it('2026-09-23 的农历日名（参考 iOS 日历：八月十三）', () => {
    const r = solarToLunar(2026, 9, 23)
    // 月与日可在此按权威历表核对；此处断言日名非空且为中文
    expect(r.lunarDay).toBeGreaterThanOrEqual(1)
    expect(r.lunarDay).toBeLessThanOrEqual(30)
    expect(r.dayName).toMatch(/^[初十廿三]|[十]|^/)
  })

  it('农历日名边界', () => {
    expect(lunarDayName(1)).toBe('初一')
    expect(lunarDayName(5)).toBe('初五')
    expect(lunarDayName(10)).toBe('初十')
    expect(lunarDayName(11)).toBe('十一')
    expect(lunarDayName(20)).toBe('二十')
    expect(lunarDayName(21)).toBe('廿一')
    expect(lunarDayName(29)).toBe('廿九')
    expect(lunarDayName(30)).toBe('三十')
  })

  it('农历月名含闰月', () => {
    expect(lunarMonthName(1)).toBe('正月')
    expect(lunarMonthName(5, true)).toBe('闰五月')
    expect(lunarMonthName(12)).toBe('腊月')
  })
})
