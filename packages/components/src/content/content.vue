<script setup lang="ts">
import { contentProps } from './props'

defineOptions({ name: 'ShsContent' })

defineProps(contentProps)
</script>

<template>
  <main class="shs-content">
    <slot />
  </main>
</template>

<style lang="scss" src="./style/index.scss"></style>
