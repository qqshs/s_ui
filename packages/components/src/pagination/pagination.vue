<script setup lang="ts">
import { computed } from 'vue'
import { paginationProps } from './props'

defineOptions({ name: 'ShsPagination' })

const props = defineProps(paginationProps)
const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
  (e: 'change', page: number): void
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const pages = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

const go = (page: number) => {
  if (page < 1 || page > totalPages.value || page === props.currentPage) return
  emit('update:currentPage', page)
  emit('change', page)
}
</script>

<template>
  <div class="shs-pagination">
    <button class="shs-pagination__btn" :disabled="currentPage <= 1" @click="go(currentPage - 1)">
      上一页
    </button>
    <button
      v-for="p in pages"
      :key="p"
      class="shs-pagination__btn"
      :class="{ 'is-active': p === currentPage }"
      @click="go(p)"
    >
      {{ p }}
    </button>
    <button
      class="shs-pagination__btn"
      :disabled="currentPage >= totalPages"
      @click="go(currentPage + 1)"
    >
      下一页
    </button>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
