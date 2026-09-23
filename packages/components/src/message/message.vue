<script setup lang="ts">
import { onMounted } from 'vue'
import { messageProps, type MessageType } from './props'
import { ShsIcon } from '../icon'
import type { IconName } from '@shs-ui/icons'

defineOptions({ name: 'ShsMessage' })

const props = defineProps(messageProps)
const emit = defineEmits<{ (e: 'close'): void }>()

const iconMap: Record<MessageType, IconName> = {
  success: 'check',
  error: 'close',
  warning: 'warning',
  info: 'info',
}

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => emit('close'), props.duration)
  }
})
</script>

<template>
  <div class="shs-message" :class="`shs-message--${type}`">
    <shs-icon :name="iconMap[type]" :size="16" />
    <span class="shs-message__content">{{ content }}</span>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
