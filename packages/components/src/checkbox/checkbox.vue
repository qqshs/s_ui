<script setup lang="ts">
import { computed, inject } from 'vue'
import { checkboxProps, type CheckboxValue } from './props'
import type { CheckboxGroupContext } from './types'

defineOptions({ name: 'ShsCheckbox' })

const props = defineProps(checkboxProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const group = inject<CheckboxGroupContext | null>('shsCheckboxGroup', null)

const checked = computed(() =>
  group ? group.modelValue.includes(props.value as CheckboxValue) : props.modelValue
)
const disabled = computed(() => props.disabled || group?.disabled === true)

const handleChange = () => {
  if (disabled.value) return
  if (group) group.toggle(props.value as CheckboxValue)
  else {
    emit('update:modelValue', !props.modelValue)
    emit('change', !props.modelValue)
  }
}
</script>

<template>
  <label
    class="shs-checkbox"
    :class="{ 'is-checked': checked, 'is-disabled': disabled }"
    @click="handleChange"
  >
    <span class="shs-checkbox__inner" />
    <span class="shs-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style lang="scss" src="./style/index.scss"></style>
