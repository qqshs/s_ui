import type { PropType } from 'vue'

export interface CalendarEvent {
  /** 待办唯一标识 */
  id?: string
  /** 所属日期，格式 YYYY-MM-DD */
  date: string
  /** 待办内容 */
  title: string
}

export const calendarProps = {
  /** 待办事项列表（v-model:events） */
  events: {
    type: Array as PropType<CalendarEvent[]>,
    default: () => [],
  },
  /** 选中日期（v-model，YYYY-MM-DD） */
  modelValue: {
    type: String,
    default: '',
  },
  /** 是否可添加/编辑/删除待办 */
  editable: {
    type: Boolean,
    default: true,
  },
} as const

export type CalendarProps = typeof calendarProps
