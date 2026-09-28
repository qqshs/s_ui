<script setup lang="ts">
import { computed } from 'vue'
import { buttonProps } from './props'
import { ShsIcon } from '../icon'

defineOptions({ name: 'ShsButton' })

const props = defineProps(buttonProps)
const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

/** 四角弧度：预设值映射到设计令牌，数字直接作为像素 */
const radiusStyle = computed(() => {
  const preset: Record<string, string> = {
    none: '0',
    small: 'var(--shs-radius-sm)',
    medium: 'var(--shs-radius-md)',
    large: 'var(--shs-radius-lg)',
  }
  const value = props.radius
  return {
    '--shs-button-radius': typeof value === 'number' ? `${value}px` : preset[value],
  }
})

const handleClick = (ev: MouseEvent) => emit('click', ev)
</script>

<template>
  <button
    class="shs-button"
    :class="[
      `shs-button--${type}`,
      `shs-button--${size}`,
      { 'is-disabled': disabled, 'is-round': round, 'is-loading': loading },
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    :style="radiusStyle"
    @click="handleClick"
  >
    <shs-icon v-if="loading" name="info" class="shs-button__loading" :size="14" />
    <slot />
  </button>
</template>

<style lang="scss" src="./style/index.scss"></style>
