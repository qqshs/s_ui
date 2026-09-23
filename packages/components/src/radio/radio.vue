<script setup lang="ts">
import { computed, inject } from 'vue'
import { radioProps, type RadioValue } from './props'
import type { RadioGroupContext } from './types'

defineOptions({ name: 'ShsRadio' })

const props = defineProps(radioProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: RadioValue): void
  (e: 'change', value: RadioValue): void
}>()

const group = inject<RadioGroupContext | null>('shsRadioGroup', null)

const checked = computed(() =>
  group ? group.modelValue === props.value : props.modelValue === props.value
)
const disabled = computed(() => props.disabled || group?.disabled === true)

const handleChange = () => {
  if (disabled.value) return
  if (group) group.onChange(props.value)
  else {
    emit('update:modelValue', props.value)
    emit('change', props.value)
  }
}
</script>

<template>
  <label
    class="shs-radio"
    :class="{ 'is-checked': checked, 'is-disabled': disabled }"
    @click="handleChange"
  >
    <span class="shs-radio__inner" />
    <span class="shs-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style lang="scss" src="./style/index.scss"></style>
