<script setup lang="ts">
import { computed, inject } from 'vue'
import { colProps } from './props'

defineOptions({ name: 'ShsCol' })

const props = defineProps(colProps)

// 接收来自 Row 的 gutter
const gutter = inject<() => number>('shsRowGutter', () => 0)

const colStyle = computed(() => {
  const halfGutter = gutter() / 2
  return {
    width: `${(props.span / 24) * 100}%`,
    paddingLeft: `${halfGutter}px`,
    paddingRight: `${halfGutter}px`,
    marginLeft: props.offset > 0 ? `${(props.offset / 24) * 100}%` : undefined,
  }
})
</script>

<template>
  <div class="shs-col" :style="colStyle">
    <slot />
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
