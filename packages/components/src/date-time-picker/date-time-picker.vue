<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { dateTimePickerProps } from './props'
import { ShsIcon } from '../icon'

defineOptions({ name: 'ShsDateTimePicker' })

const props = defineProps(dateTimePickerProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'clear'): void
}>()

const open = ref(false)
const viewYear = ref(new Date().getFullYear())
const viewMonth = ref(new Date().getMonth())
const selectedDay = ref(1)
const hour = ref(0)
const minute = ref(0)
const rootRef = ref<HTMLElement | null>(null)
const weekHeader = ['日', '一', '二', '三', '四', '五', '六']

const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))
const minutes = computed(() => Array.from({ length: 60 }, (_, i) => i))

const pad = (n: number) => String(n).padStart(2, '0')
const formatDate = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`
const formatTime = () => `${pad(hour.value)}:${pad(minute.value)}`
const formatDateTime = () =>
  `${formatDate(viewYear.value, viewMonth.value, selectedDay.value)} ${formatTime()}`

function initFromModel() {
  if (props.modelValue) {
    const [date, time] = props.modelValue.split(' ')
    const [y, m, d] = date.split('-').map(Number)
    const [hh, mm] = (time || '00:00').split(':').map(Number)
    viewYear.value = y
    viewMonth.value = m - 1
    selectedDay.value = Number.isNaN(d) ? 1 : d
    hour.value = Number.isNaN(hh) ? 0 : hh
    minute.value = Number.isNaN(mm) ? 0 : mm
  } else {
    const now = new Date()
    viewYear.value = now.getFullYear()
    viewMonth.value = now.getMonth()
    selectedDay.value = now.getDate()
    hour.value = now.getHours()
    minute.value = now.getMinutes()
  }
}

const openPanel = () => {
  if (props.disabled) return
  initFromModel()
  open.value = true
}

const firstDayOffset = computed(() => new Date(viewYear.value, viewMonth.value, 1).getDay())
const daysInMonth = computed(() => new Date(viewYear.value, viewMonth.value + 1, 0).getDate())
const cells = computed<(number | null)[]>(() => {
  const list: (number | null)[] = []
  for (let i = 0; i < firstDayOffset.value; i++) list.push(null)
  for (let d = 1; d <= daysInMonth.value; d++) list.push(d)
  return list
})

const selectDate = (d: number) => {
  selectedDay.value = d
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
const confirm = () => {
  const val = formatDateTime()
  emit('update:modelValue', val)
  emit('change', val)
  open.value = false
}
const clear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
const isSelected = (d: number) => d === selectedDay.value

function onClickOutside(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="rootRef" class="shs-date-picker shs-date-time-picker">
    <div class="shs-date-picker__input" :class="{ 'is-disabled': disabled }" @click="openPanel">
      <span class="shs-date-picker__text" :class="{ 'shs-date-picker__placeholder': !modelValue }">
        {{ modelValue || placeholder }}
      </span>
      <shs-icon v-if="clearable && modelValue" name="close" :size="14" @click.stop="clear" />
      <shs-icon name="arrow-down" :size="14" @click.stop="openPanel" />
    </div>
    <transition name="shs-dropdown">
      <div v-if="open" class="shs-date-picker__panel">
        <div class="shs-date-picker__header">
          <button class="shs-date-picker__nav" @click="prevMonth">‹</button>
          <span class="shs-date-picker__title">{{ viewYear }} 年 {{ viewMonth + 1 }} 月</span>
          <button class="shs-date-picker__nav" @click="nextMonth">›</button>
        </div>
        <div class="shs-date-picker__week">
          <span v-for="w in weekHeader" :key="w">{{ w }}</span>
        </div>
        <div class="shs-date-picker__days">
          <span
            v-for="(d, i) in cells"
            :key="i"
            class="shs-date-picker__cell"
            :class="{
              'is-empty': d === null,
              'is-selected': d !== null && isSelected(d),
            }"
            @click="d !== null && selectDate(d)"
          >
            {{ d ?? '' }}
          </span>
        </div>
        <div class="shs-date-time-picker__time">
          <select v-model.number="hour" class="shs-date-time-picker__select">
            <option v-for="h in hours" :key="h" :value="h">
              {{ pad(h) }}
            </option>
          </select>
          <span class="shs-date-time-picker__sep">:</span>
          <select v-model.number="minute" class="shs-date-time-picker__select">
            <option v-for="m in minutes" :key="m" :value="m">
              {{ pad(m) }}
            </option>
          </select>
          <button class="shs-date-time-picker__confirm" @click="confirm">确定</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" src="../date-picker/style/index.scss"></style>
<style lang="scss">
.shs-date-time-picker__time {
  display: flex;
  gap: 4px;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--shs-color-border);
}

.shs-date-time-picker__select {
  height: 28px;
  border: 1px solid var(--shs-color-border);
  border-radius: var(--shs-radius-sm, 4px);
  background-color: var(--shs-color-bg);
  padding: 0 4px;
  font-size: 13px;
}

.shs-date-time-picker__sep {
  color: var(--shs-color-text-secondary, #9ca3af);
}

.shs-date-time-picker__confirm {
  margin-left: auto;
  height: 28px;
  padding: 0 14px;
  border: none;
  border-radius: var(--shs-radius-sm, 4px);
  background-color: var(--shs-color-primary);
  color: #fff;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}
</style>
