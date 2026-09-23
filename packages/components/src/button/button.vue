<script setup lang="ts">
import { buttonProps } from './props'

defineOptions({ name: 'ShsButton' })

defineProps(buttonProps)
const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const handleClick = (ev: MouseEvent) => emit('click', ev)
</script>

<template>
  <button
    class="shs-button"
    :class="[`shs-button--${type}`, `shs-button--${size}`, { 'is-disabled': disabled }]"
    :type="nativeType"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" src="./style/index.scss"></style>
