<script setup lang="ts">
import { ref } from 'vue'
import type { MenuItem } from './props'

defineOptions({ name: 'ShsMenuItem' })

const props = defineProps<{ item: MenuItem; activeKey: string }>()
const emit = defineEmits<{ (e: 'select', key: string): void }>()

const open = ref(false)

const handleClick = () => {
  if (props.item.disabled) return
  if (props.item.children?.length) {
    open.value = !open.value
    return
  }
  emit('select', props.item.key)
}
</script>

<template>
  <li
    class="shs-menu-item"
    :class="{
      'is-disabled': item.disabled,
      'is-active': !item.children?.length && activeKey === item.key,
      'is-open': open,
    }"
    @click="handleClick"
  >
    <div class="shs-menu-item__label">
      <span>{{ item.label }}</span>
      <shs-icon v-if="item.children?.length" name="arrow-down" :size="14" />
    </div>
    <ul v-if="item.children?.length && open" class="shs-menu-item__sub">
      <menu-item
        v-for="sub in item.children"
        :key="sub.key"
        :item="sub"
        :active-key="activeKey"
        @select="(k: string) => emit('select', k)"
      />
    </ul>
  </li>
</template>
