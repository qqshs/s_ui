<script setup lang="ts">
import { computed } from 'vue'
import { modalProps } from './props'
import { ShsButton } from '../button'
import { ShsIcon } from '../icon'

defineOptions({ name: 'ShsModal' })

const props = defineProps(modalProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleMask = () => {
  if (props.closeOnClickModal) close()
}

const handleConfirm = () => {
  emit('confirm')
  close()
}

const handleCancel = () => {
  emit('cancel')
  close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="shs-modal">
      <div v-if="visible" class="shs-modal" @click.self="handleMask">
        <div class="shs-modal__dialog" :style="{ width }">
          <div class="shs-modal__header">
            <span class="shs-modal__title">
              <slot name="title">{{ title }}</slot>
            </span>
            <button class="shs-modal__close" type="button" aria-label="close" @click="close">
              <shs-icon name="close" :size="16" />
            </button>
          </div>
          <div class="shs-modal__body">
            <slot />
          </div>
          <div v-if="showFooter" class="shs-modal__footer">
            <slot name="footer">
              <shs-button @click="handleCancel">
                {{ cancelText }}
              </shs-button>
              <shs-button type="primary" @click="handleConfirm">
                {{ confirmText }}
              </shs-button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" src="./style/index.scss"></style>
