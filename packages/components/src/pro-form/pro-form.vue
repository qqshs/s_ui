<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { ShsInput } from '../input'
import { ShsSelect } from '../select'
import { ShsButton } from '../button'
import { proFormProps } from './props'

defineOptions({ name: 'ShsProForm' })

const props = defineProps(proFormProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, unknown>): void
  (e: 'submit', value: Record<string, unknown>, valid: boolean): void
}>()

const form = reactive<Record<string, string | number | undefined>>({})
const errors = ref<Record<string, string>>({})

const initForm = () => {
  for (const key of Object.keys(form)) delete form[key]
  for (const f of props.fields) {
    form[f.prop] =
      (props.modelValue?.[f.prop] as string | number | undefined) ?? f.initialValue ?? ''
  }
}
watch(() => props.fields, initForm, { immediate: true })
watch(
  () => props.modelValue,
  () => {
    for (const f of props.fields) {
      if (props.modelValue?.[f.prop] !== undefined)
        form[f.prop] = props.modelValue[f.prop] as string | number | undefined
    }
  }
)

watch(form, () => emit('update:modelValue', { ...form }), { deep: true })

const labelStyle = computed(() => {
  if (props.labelWidth === undefined) return undefined
  return {
    width: typeof props.labelWidth === 'number' ? `${props.labelWidth}px` : props.labelWidth,
  }
})

const submit = () => {
  const errs: Record<string, string> = {}
  for (const f of props.fields) {
    const v = form[f.prop]
    if (f.required && (v === '' || v === undefined || v === null)) {
      errs[f.prop] = `${f.label}为必填项`
    }
  }
  errors.value = errs
  emit('submit', { ...form }, Object.keys(errs).length === 0)
}

const reset = () => {
  initForm()
  errors.value = {}
}
</script>

<template>
  <div class="shs-pro-form">
    <div
      v-for="field in fields"
      :key="field.prop"
      class="shs-pro-form__item"
      :class="{ 'is-error': errors[field.prop] }"
    >
      <label class="shs-pro-form__label" :style="labelStyle">
        <span v-if="field.required" class="shs-pro-form__required">*</span>
        {{ field.label }}
      </label>
      <div class="shs-pro-form__control">
        <ShsSelect
          v-if="field.type === 'select'"
          v-model="form[field.prop]"
          :options="field.options"
          :placeholder="field.placeholder"
          :disabled="disabled"
          style="width: 100%"
        />
        <textarea
          v-else-if="field.type === 'textarea'"
          v-model="form[field.prop]"
          class="shs-pro-form__textarea"
          :placeholder="field.placeholder"
          :disabled="disabled"
        />
        <ShsInput
          v-else
          v-model="form[field.prop]"
          :type="field.type === 'number' ? 'number' : 'text'"
          :placeholder="field.placeholder"
          :disabled="disabled"
          style="width: 100%"
        />
        <div v-if="errors[field.prop]" class="shs-pro-form__error">
          {{ errors[field.prop] }}
        </div>
      </div>
    </div>
    <div class="shs-pro-form__actions">
      <ShsButton type="primary" @click="submit">
        {{ submitText }}
      </ShsButton>
      <ShsButton v-if="showReset" @click="reset"> 重置 </ShsButton>
    </div>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
