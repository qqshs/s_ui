<script setup lang="ts">
import { computed } from 'vue'
import { footerProps } from './props'

defineOptions({ name: 'ShsFooter' })

const props = defineProps(footerProps)

const heightStyle = computed(() => {
  const h = props.height
  return typeof h === 'number' ? `${h}px` : h
})
</script>

<template>
  <footer class="shs-footer" :style="{ height: heightStyle }">
    <slot />
  </footer>
</template>

<style lang="scss" src="./style/index.scss"></style>
