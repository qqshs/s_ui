<script setup lang="ts">
import { tabsProps, type TabItem } from './props'

defineOptions({ name: 'ShsTabs' })

defineProps(tabsProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const select = (tab: TabItem) => {
  if (tab.disabled) return
  emit('update:modelValue', tab.name)
  emit('change', tab.name)
}
</script>

<template>
  <div class="shs-tabs" :class="`shs-tabs--${type}`">
    <div class="shs-tabs__header">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        class="shs-tabs__tab"
        :class="{
          'is-active': modelValue === tab.name,
          'is-disabled': tab.disabled,
        }"
        @click="select(tab)"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="shs-tabs__content">
      <slot :name="`pane-${modelValue}`" />
    </div>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
