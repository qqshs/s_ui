<script setup lang="ts">
import { provide, reactive } from 'vue'
import { formProps } from './props'
import type { FormItemContext, FormRules } from './types'

defineOptions({ name: 'ShsForm' })

const props = defineProps(formProps)

interface Field {
  prop: string
  validate: () => Promise<boolean>
}

const fields = reactive<Field[]>([])

const registerField = (field: Field) => {
  if (!fields.some((f) => f.prop === field.prop)) fields.push(field)
}

const unregisterField = (prop: string) => {
  const index = fields.findIndex((f) => f.prop === prop)
  if (index >= 0) fields.splice(index, 1)
}

const context: FormItemContext = {
  model: props.model as Record<string, unknown>,
  rules: props.rules as FormRules,
  registerField,
  unregisterField,
}
provide('shsFormContext', context)

/** 校验全部字段，返回是否全部通过 */
async function validate(): Promise<boolean> {
  const results = await Promise.all(fields.map((f) => f.validate()))
  return results.every(Boolean)
}

defineExpose({ validate })
</script>

<template>
  <form
    class="shs-form"
    :style="labelWidth ? { '--shs-form-label-width': labelWidth } : undefined"
    @submit.prevent
  >
    <slot />
  </form>
</template>

<style lang="scss" src="./style/index.scss"></style>
