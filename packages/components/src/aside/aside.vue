<script setup lang="ts">
import { computed } from 'vue'
import { asideProps } from './props'

defineOptions({ name: 'ShsAside' })

const props = defineProps(asideProps)

const widthStyle = computed(() => {
  const w = props.width
  return typeof w === 'number' ? `${w}px` : w
})
</script>

<template>
  <aside class="shs-aside" :style="{ width: widthStyle }">
    <slot />
  </aside>
</template>

<style lang="scss" src="./style/index.scss"></style>
