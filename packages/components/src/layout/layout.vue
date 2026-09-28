<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { VNode } from 'vue'
import { layoutProps } from './props'

defineOptions({ name: 'ShsLayout' })

defineProps(layoutProps)

const slots = useSlots()

// 检测默认插槽的直接子级中是否存在 ShsAside 组件：
// 存在时容器切换为横向（左右）布局，否则纵向（上下）布局。
// 注意：只检查直接子级，嵌套在子 Layout 中的 Aside 不影响本层方向。
const hasAsideClass = computed(() => {
  const defaultSlot = (slots as any).default
  const nodes: VNode[] = typeof defaultSlot === 'function' ? ((defaultSlot() as VNode[]) ?? []) : []
  return nodes.some((node) => {
    const comp = node.type
    return !!(
      comp &&
      typeof comp === 'object' &&
      'name' in comp &&
      (comp as { name?: string }).name?.startsWith('ShsAside')
    )
  })
})
</script>

<template>
  <div class="shs-layout" :class="{ 'is-has-aside': hasAsideClass }">
    <slot />
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
