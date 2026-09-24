<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { solarToLunar, lunarYearGanzhi, lunarZodiac, solarTermOf } from '@shs-ui/utils'
import { calendarProps, type CalendarEvent } from './props'

defineOptions({ name: 'ShsCalendar' })

const props = defineProps(calendarProps)
const emit = defineEmits<{
  (e: 'update:events', events: CalendarEvent[]): void
  (e: 'update:modelValue', value: string): void
  (e: 'add', event: CalendarEvent): void
  (e: 'update', event: CalendarEvent): void
  (e: 'remove', id: string): void
}>()

const today = (() => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
})()

const now = new Date()
const viewYear = ref(now.getFullYear())
const viewMonth = ref(now.getMonth())
const selectedDate = ref(props.modelValue || today)
const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const weekHeader = ['日', '一', '二', '三', '四', '五', '六']
const newTitle = ref('')
const editingId = ref('')
const editingTitle = ref('')

const pad = (n: number) => String(n).padStart(2, '0')
const formatDate = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`

const eventsByDate = computed(() => {
  const map: Record<string, CalendarEvent[]> = {}
  for (const e of props.events) {
    ;(map[e.date] ||= []).push(e)
  }
  return map
})

const firstDayOffset = computed(() => new Date(viewYear.value, viewMonth.value, 1).getDay())
const daysInMonth = computed(() => new Date(viewYear.value, viewMonth.value + 1, 0).getDate())
const cells = computed<(number | null)[]>(() => {
  const list: (number | null)[] = []
  for (let i = 0; i < firstDayOffset.value; i++) list.push(null)
  for (let d = 1; d <= daysInMonth.value; d++) list.push(d)
  const tail = (7 - ((firstDayOffset.value + daysInMonth.value) % 7)) % 7
  for (let i = 0; i < tail; i++) list.push(null)
  return list
})

/** 某日在天格内展示的待办（最多两条）与「更多」剩余数 */
const dayItems = (y: number, m: number, d: number) => {
  const list = eventsByDate.value[formatDate(y, m, d)] || []
  return { items: list.slice(0, 2), more: Math.max(0, list.length - 2) }
}

// 注意：viewMonth 为 0-based（getMonth()），solarToLunar/solarTermOf 需要 1-based，此处 m + 1 修正
const lunarCellLabel = (y: number, m: number, d: number) => {
  const l = solarToLunar(y, m + 1, d)
  return solarTermOf(y, m + 1, d) || `${l.monthName}${l.dayName}`
}
const isTermDay = (y: number, m: number, d: number) => solarTermOf(y, m + 1, d) !== null
const solarLabel = (y: number, m: number, d: number) => (d === 1 ? `${m + 1}月${d}日` : `${d}日`)

const adjacentDate = (i: number) => {
  if (i < firstDayOffset.value) {
    const prevDays = new Date(viewYear.value, viewMonth.value, 0).getDate()
    return prevDays - firstDayOffset.value + i + 1
  }
  return i - firstDayOffset.value - daysInMonth.value + 1
}

const isSelected = (d: number) =>
  selectedDate.value === formatDate(viewYear.value, viewMonth.value, d)
const isToday = (d: number) => today === formatDate(viewYear.value, viewMonth.value, d)

const selectDate = (d: number) => {
  selectedDate.value = formatDate(viewYear.value, viewMonth.value, d)
  emit('update:modelValue', selectedDate.value)
  open.value = true
}
const prevMonth = () => {
  viewMonth.value--
  if (viewMonth.value < 0) {
    viewMonth.value = 11
    viewYear.value--
  }
}
const nextMonth = () => {
  viewMonth.value++
  if (viewMonth.value > 11) {
    viewMonth.value = 0
    viewYear.value++
  }
}

const selectedEvents = computed(() => eventsByDate.value[selectedDate.value] || [])
const selectedWeekday = computed(
  () => weekHeader[new Date(selectedDate.value + 'T00:00:00').getDay()]
)

const lunarDetail = computed(() => {
  const [y, m, d] = selectedDate.value.split('-').map(Number)
  const l = solarToLunar(y, m, d)
  const term = solarTermOf(y, m, d)
  const base = `农历${lunarYearGanzhi(l.lunarYear)}年（${lunarZodiac(l.lunarYear)}） · ${l.monthName}${l.dayName}`
  return term ? `${base} · ${term}` : base
})

const addTodo = () => {
  const title = newTitle.value.trim()
  if (!title || !selectedDate.value) return
  const evt: CalendarEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: selectedDate.value,
    title,
  }
  emit('update:events', [...props.events, evt])
  emit('add', evt)
  newTitle.value = ''
}

const startEdit = (evt: CalendarEvent) => {
  if (!props.editable) return
  editingId.value = evt.id || ''
  editingTitle.value = evt.title
}
const saveEdit = () => {
  const title = editingTitle.value.trim()
  if (!title) return
  const next = props.events.map((evt) => (evt.id === editingId.value ? { ...evt, title } : evt))
  const updated = next.find((evt) => evt.id === editingId.value)
  emit('update:events', next)
  if (updated) emit('update', updated)
  editingId.value = ''
}
const cancelEdit = () => {
  editingId.value = ''
}
const removeTodo = (id: string) => {
  emit(
    'update:events',
    props.events.filter((evt) => evt.id !== id)
  )
  emit('remove', id)
}

function onClickOutside(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="rootRef" class="shs-calendar">
    <div class="shs-calendar__main">
      <div class="shs-calendar__header">
        <button class="shs-calendar__nav" @click="prevMonth">‹</button>
        <span class="shs-calendar__title">{{ viewYear }} 年 {{ viewMonth + 1 }} 月</span>
        <button class="shs-calendar__nav" @click="nextMonth">›</button>
      </div>
      <div class="shs-calendar__week">
        <span v-for="w in weekHeader" :key="w">{{ w }}</span>
      </div>
      <div class="shs-calendar__days">
        <span
          v-for="(d, i) in cells"
          :key="i"
          class="shs-calendar__cell"
          :class="{
            'is-empty': d === null,
            'is-selected': d !== null && isSelected(d),
            'is-today': d !== null && isToday(d),
          }"
          @click="d !== null && selectDate(d)"
        >
          <template v-if="d !== null">
            <span
              class="shs-calendar__lunar"
              :class="{ 'has-term': isTermDay(viewYear, viewMonth, d) }"
            >
              {{ lunarCellLabel(viewYear, viewMonth, d) }}
            </span>
            <span class="shs-calendar__day">
              {{ solarLabel(viewYear, viewMonth, d) }}
            </span>
            <span
              v-if="dayItems(viewYear, viewMonth, d).items.length > 0"
              class="shs-calendar__todos-mini"
            >
              <span
                v-for="item in dayItems(viewYear, viewMonth, d).items"
                :key="item.id"
                class="shs-calendar__todo-mini"
              >
                {{ item.title }}
              </span>
              <span v-if="dayItems(viewYear, viewMonth, d).more > 0" class="shs-calendar__more">
                更多{{ dayItems(viewYear, viewMonth, d).more }}
              </span>
            </span>
          </template>
          <span v-else class="shs-calendar__day shs-calendar__day--adjacent">
            {{ adjacentDate(i) }}
          </span>
        </span>
      </div>
    </div>

    <transition name="shs-popover">
      <div v-if="open" class="shs-calendar__popover">
        <div class="shs-calendar__popover-header">
          <div class="shs-calendar__popover-title">
            {{ selectedDate }} · 星期{{ selectedWeekday }}
          </div>
          <button class="shs-calendar__popover-close" @click="open = false">×</button>
        </div>
        <div class="shs-calendar__popover-lunar">
          {{ lunarDetail }}
        </div>

        <div v-if="editable" class="shs-calendar__add">
          <input
            v-model="newTitle"
            class="shs-calendar__add-input"
            placeholder="新增待办..."
            @keyup.enter="addTodo"
          />
          <button class="shs-calendar__add-btn" @click="addTodo">添加</button>
        </div>

        <div class="shs-calendar__todos">
          <div v-if="!selectedEvents.length" class="shs-calendar__todos-empty">今日无待办</div>
          <div
            v-for="evt in selectedEvents"
            :key="evt.id"
            class="shs-calendar__todo"
            :class="{ 'is-editing': editingId === evt.id }"
          >
            <template v-if="editingId !== evt.id">
              <span class="shs-calendar__todo-title" @click="startEdit(evt)">
                {{ evt.title }}
              </span>
              <button v-if="editable" class="shs-calendar__todo-del" @click="removeTodo(evt.id!)">
                删除
              </button>
            </template>
            <template v-else>
              <input
                v-model="editingTitle"
                class="shs-calendar__todo-input"
                @keyup.enter="saveEdit"
              />
              <button class="shs-calendar__todo-save" @click="saveEdit">保存</button>
              <button class="shs-calendar__todo-cancel" @click="cancelEdit">取消</button>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
