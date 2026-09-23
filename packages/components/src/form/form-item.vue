<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { formItemProps } from './form-item/props'
import type { FormItemContext, FormRule } from './types'

defineOptions({ name: 'ShsFormItem' })

const props = defineProps(formItemProps)

const context = inject<FormItemContext>('shsFormContext')
const errorMessage = ref('')

function resolveRules(): FormRule[] {
  if (!context) return []
  const rules = context.rules[props.prop]
  if (!rules) return []
  return Array.isArray(rules) ? rules : [rules]
}

async function checkRule(rule: FormRule, value: unknown): Promise<boolean> {
  if (rule.required) {
    const empty = value === undefined || value === null || value === ''
    if (empty) return false
  }
  if (rule.pattern && typeof value === 'string' && value !== '') {
    if (!rule.pattern.test(value)) return false
  }
  if (typeof value === 'string' && value !== '') {
    if (rule.min !== undefined && value.length < rule.min) return false
    if (rule.max !== undefined && value.length > rule.max) return false
  }
  if (rule.validator) {
    return Boolean(await rule.validator(value, context!.model))
  }
  return true
}

async function validate(): Promise<boolean> {
  if (!context || !props.prop) return true
  const rules = resolveRules()
  if (rules.length === 0) {
    errorMessage.value = ''
    return true
  }
  const value = context.model[props.prop]
  for (const rule of rules) {
    const ok = await checkRule(rule, value)
    if (!ok) {
      errorMessage.value = rule.message || '字段校验未通过'
      return false
    }
  }
  errorMessage.value = ''
  return true
}

const clearValidate = () => {
  errorMessage.value = ''
}

onMounted(() => {
  context?.registerField({ prop: props.prop, validate })
})
onBeforeUnmount(() => {
  context?.unregisterField(props.prop)
})

defineExpose({ validate, clearValidate })
</script>

<template>
  <div class="shs-form-item" :class="{ 'has-error': !!errorMessage }">
    <label v-if="label" class="shs-form-item__label">{{ label }}</label>
    <div class="shs-form-item__content">
      <slot />
      <div v-if="errorMessage" class="shs-form-item__error" role="alert">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
