<script setup lang="ts">
import { computed, ref } from 'vue'
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
  return list
})

const dayCount = (y: number, m: number, d: number) => {
  const key = formatDate(y, m, d)
  return eventsByDate.value[key]?.length || 0
}

const isSelected = (d: number) =>
  selectedDate.value === formatDate(viewYear.value, viewMonth.value, d)
const isToday = (d: number) => today === formatDate(viewYear.value, viewMonth.value, d)

const selectDate = (d: number) => {
  selectedDate.value = formatDate(viewYear.value, viewMonth.value, d)
  emit('update:modelValue', selectedDate.value)
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
</script>

<template>
  <div class="shs-calendar">
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
          {{ d ?? '' }}
          <span
            v-if="d !== null && dayCount(viewYear, viewMonth, d) > 0"
            class="shs-calendar__badge"
          >
            {{ dayCount(viewYear, viewMonth, d) }}
          </span>
        </span>
      </div>
    </div>

    <div class="shs-calendar__side">
      <div class="shs-calendar__side-title">{{ selectedDate }} · 星期{{ selectedWeekday }}</div>

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
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
