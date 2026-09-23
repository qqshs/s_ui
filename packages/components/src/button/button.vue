<script setup lang="ts">
import { buttonProps } from './props'
import { ShsIcon } from '../icon'

defineOptions({ name: 'ShsButton' })

defineProps(buttonProps)
const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

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
    @click="handleClick"
  >
    <shs-icon v-if="loading" name="info" class="shs-button__loading" :size="14" />
    <slot />
  </button>
</template>

<style lang="scss" src="./style/index.scss"></style>
