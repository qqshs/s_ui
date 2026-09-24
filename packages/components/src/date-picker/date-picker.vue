<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { datePickerProps } from './props'
import { ShsIcon } from '../icon'

defineOptions({ name: 'ShsDatePicker' })

const props = defineProps(datePickerProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'clear'): void
}>()

const open = ref(false)
const viewYear = ref(new Date().getFullYear())
const viewMonth = ref(new Date().getMonth())
const rootRef = ref<HTMLElement | null>(null)
const weekHeader = ['日', '一', '二', '三', '四', '五', '六']

const pad = (n: number) => String(n).padStart(2, '0')
const formatDate = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`

function initView() {
  if (props.modelValue) {
    const [y, m] = props.modelValue.split('-').map(Number)
    viewYear.value = y
    viewMonth.value = m - 1
  } else {
    const now = new Date()
    viewYear.value = now.getFullYear()
    viewMonth.value = now.getMonth()
  }
}

const openPanel = () => {
  if (props.disabled) return
  initView()
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
  const val = formatDate(viewYear.value, viewMonth.value, d)
  emit('update:modelValue', val)
  emit('change', val)
  open.value = false
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
const clear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
const isSelected = (d: number) =>
  props.modelValue === formatDate(viewYear.value, viewMonth.value, d)

function onClickOutside(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) open.value = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="rootRef" class="shs-date-picker">
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
      </div>
    </transition>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
