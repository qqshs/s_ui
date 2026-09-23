<script setup lang="ts">
import { tagProps } from './props'

defineOptions({ name: 'ShsTag' })

defineProps(tagProps)
const emit = defineEmits<{ (e: 'close', ev: MouseEvent): void }>()

const handleClose = (ev: MouseEvent) => emit('close', ev)
</script>

<template>
  <span
    class="shs-tag"
    :class="[
      `shs-tag--${type}`,
      `shs-tag--${size}`,
      { 'is-closable': closable, 'is-disabled': disabled },
    ]"
  >
    <slot />
    <button
      v-if="closable && !disabled"
      class="shs-tag__close"
      type="button"
      aria-label="close"
      @click.stop="handleClose"
    >
      ×
    </button>
  </span>
</template>

<style lang="scss" src="./style/index.scss"></style>
