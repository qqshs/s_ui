<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { selectProps, type SelectOption } from './props'
import { ShsIcon } from '../icon'

defineOptions({ name: 'ShsSelect' })

const props = defineProps(selectProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'clear'): void
}>()

const open = ref(false)
const rootRef = ref<HTMLElement>()

const selectedLabel = computed(
  () => props.options.find((o) => o.value === props.modelValue)?.label ?? ''
)

const showClear = computed(() => props.clearable && !props.disabled && props.modelValue !== '')

const handleToggle = () => {
  if (!props.disabled) open.value = !open.value
}

const handleSelect = (option: SelectOption) => {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value)
  open.value = false
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  open.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div
    ref="rootRef"
    class="shs-select"
    :class="[`shs-select--${size}`, { 'is-open': open, 'is-disabled': disabled }]"
    @click="handleToggle"
  >
    <div class="shs-select__inner">
      <span :class="{ 'is-placeholder': !selectedLabel }">{{ selectedLabel || placeholder }}</span>
      <button
        v-if="showClear"
        class="shs-select__clear"
        type="button"
        aria-label="clear"
        @click.stop="handleClear"
      >
        <shs-icon name="close" :size="14" />
      </button>
      <shs-icon :name="open ? 'arrow-up' : 'arrow-down'" class="shs-select__arrow" :size="14" />
    </div>
    <Transition name="shs-select-dropdown">
      <ul v-if="open" class="shs-select__dropdown">
        <li
          v-for="option in options"
          :key="option.value"
          class="shs-select__option"
          :class="{
            'is-selected': option.value === modelValue,
            'is-disabled': option.disabled,
          }"
          @click.stop="handleSelect(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
