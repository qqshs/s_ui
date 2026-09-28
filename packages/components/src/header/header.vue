<script setup lang="ts">
import { computed } from 'vue'
import { headerProps } from './props'

defineOptions({ name: 'ShsHeader' })

const props = defineProps(headerProps)

const heightStyle = computed(() => {
  const h = props.height
  return typeof h === 'number' ? `${h}px` : h
})
</script>

<template>
  <header class="shs-header" :style="{ height: heightStyle }">
    <slot />
  </header>
</template>

<style lang="scss" src="./style/index.scss"></style>
