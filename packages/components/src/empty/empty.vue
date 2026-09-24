<script setup lang="ts">
import { computed } from 'vue'
import { ShsIcon } from '../icon'
import { emptyProps } from './props'

defineOptions({ name: 'ShsEmpty' })

const props = defineProps(emptyProps)

const iconSize = computed(() => ({ small: 40, medium: 64, large: 96 })[props.size])
</script>

<template>
  <div class="shs-empty" :class="`shs-empty--${size}`">
    <div class="shs-empty__image">
      <slot name="icon">
        <img v-if="image" :src="image" class="shs-empty__img" alt="" />
        <ShsIcon v-else-if="icon" :name="icon" :size="iconSize" color="currentColor" />
        <svg
          v-else
          class="shs-empty__default"
          viewBox="0 0 80 80"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <circle cx="40" cy="40" r="36" stroke-width="2" stroke-dasharray="4 4" />
          <rect x="24" y="19" width="32" height="42" rx="4" stroke-width="2" />
          <path d="M30 30h20M30 38h20M30 46h14" stroke-width="2" stroke-linecap="round" />
        </svg>
      </slot>
    </div>
    <p v-if="description || $slots.description" class="shs-empty__description">
      <slot name="description">
        {{ description }}
      </slot>
    </p>
    <div v-if="$slots.default" class="shs-empty__footer">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
