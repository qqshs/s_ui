<script setup lang="ts">
import { ref } from 'vue'
import { menuProps } from './props'
import MenuItem from './menu-item.vue'

defineOptions({ name: 'ShsMenu' })

const props = defineProps(menuProps)
const emit = defineEmits<{ (e: 'select', key: string): void }>()

const activeKey = ref(props.defaultActive)

const onSelect = (key: string) => {
  activeKey.value = key
  emit('select', key)
}
</script>

<template>
  <ul class="shs-menu" :class="`shs-menu--${mode}`">
    <menu-item
      v-for="item in items"
      :key="item.key"
      :item="item"
      :active-key="activeKey"
      @select="onSelect"
    />
  </ul>
</template>

<style lang="scss" src="./style/index.scss"></style>
