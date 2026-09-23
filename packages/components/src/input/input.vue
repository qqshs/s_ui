<script setup lang="ts">
import { computed } from 'vue'
import { inputProps } from './props'
import { ShsIcon } from '../icon'

defineOptions({ name: 'ShsInput' })

const props = defineProps(inputProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'clear'): void
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
}>()

const currentValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const showClear = computed(
  () => props.clearable && !props.disabled && !props.readonly && currentValue.value !== ''
)

const handleInput = (ev: Event) => {
  const target = ev.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <span class="shs-input" :class="[`shs-input--${size}`, { 'is-disabled': disabled }]">
    <input
      class="shs-input__inner"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :value="currentValue"
      @input="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <button
      v-if="showClear"
      class="shs-input__clear"
      type="button"
      aria-label="clear"
      @click="handleClear"
    >
      <shs-icon name="close" :size="14" />
    </button>
  </span>
</template>

<style lang="scss" src="./style/index.scss"></style>
