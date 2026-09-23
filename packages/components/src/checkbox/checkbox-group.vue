<script setup lang="ts">
import { provide, reactive, watch } from 'vue'
import { checkboxGroupProps, type CheckboxValue } from './props'
import type { CheckboxGroupContext } from './types'

defineOptions({ name: 'ShsCheckboxGroup' })

const props = defineProps(checkboxGroupProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: CheckboxValue[]): void
  (e: 'change', value: CheckboxValue[]): void
}>()

const context = reactive<CheckboxGroupContext>({
  modelValue: props.modelValue,
  disabled: props.disabled,
  toggle: (value) => {
    const arr = props.modelValue.includes(value)
      ? props.modelValue.filter((v) => v !== value)
      : [...props.modelValue, value]
    emit('update:modelValue', arr)
    emit('change', arr)
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

provide('shsCheckboxGroup', context)
</script>

<template>
  <div class="shs-checkbox-group">
    <slot />
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
