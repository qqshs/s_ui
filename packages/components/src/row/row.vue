<script setup lang="ts">
import { provide } from 'vue'
import { rowProps } from './props'

defineOptions({ name: 'ShsRow' })

const props = defineProps(rowProps)

// 向子级 Col 提供 gutter
provide('shsRowGutter', () => props.gutter)
</script>

<template>
  <div
    class="shs-row"
    :class="[`is-justify-${justify}`, `is-align-${align}`]"
    :style="
      gutter > 0 ? { marginLeft: `-${gutter / 2}px`, marginRight: `-${gutter / 2}px` } : undefined
    "
  >
    <slot />
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
