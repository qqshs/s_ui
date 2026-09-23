<script setup lang="ts">
import { computed } from 'vue'
import { iconPaths } from '@shs-ui/icons'
import { iconProps } from './props'

defineOptions({ name: 'ShsIcon' })

const props = defineProps(iconProps)

const d = computed(() => iconPaths[props.name])
const sizeInPx = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <svg
    class="shs-icon"
    :width="sizeInPx"
    :height="sizeInPx"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="d" />
  </svg>
</template>

<style lang="scss" src="./style/index.scss"></style>
