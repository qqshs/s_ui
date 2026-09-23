<script setup lang="ts">
import { provide, reactive, watch } from 'vue'
import { radioGroupProps, type RadioValue } from './props'
import type { RadioGroupContext } from './types'

defineOptions({ name: 'ShsRadioGroup' })

const props = defineProps(radioGroupProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: RadioValue): void
  (e: 'change', value: RadioValue): void
}>()

const context = reactive<RadioGroupContext>({
  modelValue: props.modelValue,
  disabled: props.disabled,
  name: props.name,
  onChange: (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  },
})

watch(
  () => props.modelValue,
  (v) => {
    context.modelValue = v
  }
)
watch(
  () => props.disabled,
  (v) => {
    context.disabled = v
  }
)

provide('shsRadioGroup', context)
</script>

<template>
  <div class="shs-radio-group">
    <slot />
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
