<script setup lang="ts">
import { cardProps } from './props'

defineOptions({ name: 'ShsCard' })

defineProps(cardProps)
</script>

<template>
  <div class="shs-card" :class="`is-shadow-${shadow}`">
    <div v-if="$slots.header || title" class="shs-card__header">
      <slot name="header">
        {{ title }}
      </slot>
    </div>
    <div class="shs-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="shs-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
