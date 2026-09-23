/**
 * 农历（阴历）转换工具 —— 纯函数、零副作用
 * 采用经典查表法，支持 1900-2100 年公历 → 农历转换（含闰月）。
 */

export interface LunarDate {
  lunarYear: number
  lunarMonth: number
  lunarDay: number
  isLeap: boolean
  monthName: string
  dayName: string
}

/** 1900-2100 年农历信息表（每年一个整数，编码闰月与每月大小） */
const LUNAR_INFO = [
  0x04bd8,
  0x04ae0,
  0x0a570,
  0x054d5,
  0x0d260,
  0x0d950,
  0x16554,
  0x056a0,
  0x09ad0,
  0x055d2, //
  0x04ae0,
  0x0a5b6,
  0x0a4d0,
  0x0d250,
  0x1d255,
  0x0b540,
  0x0d6a0,
  0x0ada2,
  0x095b0,
  0x14977, //
  0x04970,
  0x0a4b0,
  0x0b4b5,
  0x06a50,
  0x06d40,
  0x1ab54,
  0x02b60,
  0x09570,
  0x052f2,
  0x04970, //
  0x06566,
  0x0d4a0,
  0x0ea50,
  0x06e95,
  0x05ad0,
  0x02b60,
  0x186e3,
  0x092e0,
  0x1c8d7,
  0x0c950, //
  0x0d4a0,
  0x1d8a6,
  0x0b550,
  0x056a0,
  0x1a5b4,
  0x025d0,
  0x092d0,
  0x0d2b2,
  0x0a950,
  0x0b557, //
  0x06ca0,
  0x0b550,
  0x15355,
  0x04da0,
  0x0a5b0,
  0x14573,
  0x052b0,
  0x0a9a8,
  0x0e950,
  0x06aa0, //
  0x0aea6,
  0x0ab50,
  0x04b60,
  0x0aae4,
  0x0a570,
  0x05260,
  0x0f263,
  0x0d950,
  0x05b57,
  0x056a0, //
  0x096d0,
  0x04dd5,
  0x04ad0,
  0x0a4d0,
  0x0d4d4,
  0x0d250,
  0x0d558,
  0x0b540,
  0x0b6a0,
  0x195a6, //
  0x095b0,
  0x049b0,
  0x0a974,
  0x0a4b0,
  0x0b27a,
  0x06a50,
  0x06d40,
  0x0af46,
  0x0ab60,
  0x09570, //
  0x04af5,
  0x04970,
  0x064b0,
  0x074a3,
  0x0ea50,
  0x06b58,
  0x055c0,
  0x0ab60,
  0x096d5,
  0x092e0, //
  0x0c960,
  0x0d954,
  0x0d4a0,
  0x0da50,
  0x07552,
  0x056a0,
  0x0abb7,
  0x025d0,
  0x092d0,
  0x0cab5, //
  0x0a950,
  0x0b4a0,
  0x0baa4,
  0x0ad50,
  0x055d9,
  0x04ba0,
  0x0a5b0,
  0x15176,
  0x052b0,
  0x0a930, //
  0x07954,
  0x06aa0,
  0x0ad50,
  0x05b52,
  0x04b60,
  0x0a6e6,
  0x0a4e0,
  0x0d260,
  0x0ea65,
  0x0d530, //
  0x05aa0,
  0x076a3,
  0x096d0,
  0x04afb,
  0x04ad0,
  0x0a4d0,
  0x1d0b6,
  0x0d250,
  0x0d520,
  0x0dd45, //
  0x0b5a0,
  0x056d0,
  0x055b2,
  0x049b0,
  0x0a577,
  0x0a4b0,
  0x0aa50,
  0x1b255,
  0x06d20,
  0x0ada0, //
  0x14b63,
  0x09370,
  0x049f8,
  0x04970,
  0x064b0,
  0x168a6,
  0x0ea50,
  0x06b20,
  0x1a6c4,
  0x0aae0, //
  0x092e0,
  0x0d2e3,
  0x0c960,
  0x0d557,
  0x0d4a0,
  0x0da50,
  0x05d55,
  0x056a0,
  0x0a6d0,
  0x055d4, //
  0x052d0,
  0x0a9b8,
  0x0a950,
  0x0b4a0,
  0x0b6a6,
  0x0ad50,
  0x055a0,
  0x0aba4,
  0x0a5b0,
  0x052b0, //
  0x0b273,
  0x06930,
  0x07337,
  0x06aa0,
  0x0ad50,
  0x14b55,
  0x04b60,
  0x0a570,
  0x054e4,
  0x0d160, //
  0x0e968,
  0x0d520,
  0x0daa0,
  0x16aa6,
  0x056d0,
  0x04ae0,
  0x0a9d4,
  0x0a2d0,
  0x0d150,
  0x0f252, //
  0x0d520,
]

/** 农历某年的闰月序号（1-12，0 表示无闰月） */
function leapMonthOf(year: number): number {
  return LUNAR_INFO[year - 1900] & 0xf
}

/** 农历某年闰月的天数 */
function leapDaysOf(year: number): number {
  if (!leapMonthOf(year)) return 0
  return LUNAR_INFO[year - 1900] & 0x10000 ? 30 : 29
}

/** 农历某年某月的天数 */
function monthDaysOf(year: number, month: number): number {
  return LUNAR_INFO[year - 1900] & (0x10000 >> month) ? 30 : 29
}

/** 农历某年的总天数 */
function yearDaysOf(year: number): number {
  let sum = 348
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    if (LUNAR_INFO[year - 1900] & i) sum += 1
  }
  return sum + leapDaysOf(year)
}

const MONTH_NAMES = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']

/** 农历月名，如「正月」「闰五月」「腊月」 */
export function lunarMonthName(month: number, isLeap = false): string {
  return (isLeap ? '闰' : '') + MONTH_NAMES[month - 1] + '月'
}

const TENS = ['', '十', '廿', '三']
const ONES = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']

/** 农历日名，如「初一」「初十」「廿一」「三十」 */
export function lunarDayName(day: number): string {
  if (day === 10) return '初十'
  if (day === 20) return '二十'
  if (day === 30) return '三十'
  const tens = Math.floor(day / 10)
  const ones = day % 10
  if (day < 10) return '初' + ONES[ones]
  return TENS[tens] + ONES[ones]
}

/** 公历日期转农历（y/m/d 为公历年月日） */
export function solarToLunar(year: number, month: number, day: number): LunarDate {
  const offset = Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(1900, 0, 31)) / 86400000)
  let temp = 0
  let lunarYear = 1900
  for (; lunarYear < 2101 && temp + yearDaysOf(lunarYear) <= offset; lunarYear += 1) {
    temp += yearDaysOf(lunarYear)
  }
  const leapMonth = leapMonthOf(lunarYear)
  let isLeap = false
  let lunarMonth = 12
  let done = false
  for (let m = 1; m <= 12 && !done; m += 1) {
    const regular = monthDaysOf(lunarYear, m)
    if (temp + regular > offset) {
      lunarMonth = m
      done = true
      break
    }
    temp += regular
    if (m === leapMonth) {
      const leap = leapDaysOf(lunarYear)
      if (temp + leap > offset) {
        lunarMonth = m
        isLeap = true
        done = true
        break
      }
      temp += leap
    }
  }
  const lunarDay = offset - temp + 1
  return {
    lunarYear,
    lunarMonth,
    lunarDay,
    isLeap,
    monthName: lunarMonthName(lunarMonth, isLeap),
    dayName: lunarDayName(lunarDay),
  }
}

const GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

/** 农历年天干地支，如「丙午」 */
export function lunarYearGanzhi(year: number): string {
  const g = GAN[(year - 4) % 10]
  const z = ZHI[(year - 4) % 12]
  return g + z
}

/** 农历年生肖，如「马」 */
export function lunarZodiac(year: number): string {
  return ZODIAC[(year - 4) % 12]
}
