<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { treeProps, type TreeNode } from './props'

defineOptions({ name: 'ShsTree' })

const props = defineProps(treeProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'select', node: TreeNode): void
}>()

const keyOf = (n: TreeNode) => n.value ?? n.label
const expandedSet = ref<Set<string>>(new Set())

watch(
  () => props.data,
  () => {
    if (!props.defaultExpandAll) return
    const set = new Set<string>()
    const walk = (nodes: TreeNode[]) => {
      nodes.forEach((n) => {
        if (n.children?.length) {
          set.add(keyOf(n))
          walk(n.children)
        }
      })
    }
    walk(props.data)
    expandedSet.value = set
  },
  { immediate: true }
)

interface VisibleRow {
  node: TreeNode
  depth: number
  key: string
}

const visibleRows = computed<VisibleRow[]>(() => {
  const rows: VisibleRow[] = []
  const walk = (nodes: TreeNode[], depth: number) => {
    nodes.forEach((n) => {
      const key = keyOf(n)
      rows.push({ node: n, depth, key })
      if (n.children?.length && expandedSet.value.has(key)) walk(n.children, depth + 1)
    })
  }
  walk(props.data, 0)
  return rows
})

const isExpanded = (key: string) => expandedSet.value.has(key)

const toggle = (key: string) => {
  const next = new Set(expandedSet.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  expandedSet.value = next
}

const select = (node: TreeNode) => {
  if (node.disabled) return
  emit('update:modelValue', keyOf(node))
  emit('select', node)
}
</script>

<template>
  <div class="shs-tree">
    <div
      v-for="row in visibleRows"
      :key="row.key"
      class="shs-tree__node"
      :class="{
        'is-selected': modelValue === row.key,
        'is-disabled': row.node.disabled,
      }"
      :style="{ paddingLeft: `${row.depth * 18 + 8}px` }"
      @click="select(row.node)"
    >
      <template v-if="props.showLine && row.depth > 0">
        <!-- 竖向连接线：在每个祖先层级各画一段，保证从根节点连续贯穿到当前层 -->
        <i
          v-for="level in row.depth"
          :key="'v-' + level"
          class="shs-tree__line-v"
          :style="{ left: `${(level - 1) * 18 + 16}px` }"
        />
        <!-- 横向连接线：连接父级连接点到当前节点箭头 -->
        <i class="shs-tree__line-h" :style="{ left: `${(row.depth - 1) * 18 + 16}px` }" />
      </template>
      <span
        class="shs-tree__arrow"
        :class="{
          'is-leaf': !row.node.children?.length,
          'is-open': isExpanded(row.key),
        }"
        @click.stop="row.node.children?.length && toggle(row.key)"
      >
        ›
      </span>
      <span class="shs-tree__label">{{ row.node.label }}</span>
    </div>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
