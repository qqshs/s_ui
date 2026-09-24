<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { ShsTable } from '../table'
import { ShsPagination } from '../pagination'
import { ShsInput } from '../input'
import { ShsSelect } from '../select'
import { ShsButton } from '../button'
import { proTableProps } from './props'

defineOptions({ name: 'ShsProTable' })

const props = defineProps(proTableProps)
const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void
  (e: 'search', params: Record<string, unknown>): void
  (e: 'reset'): void
}>()

const params = reactive<Record<string, string | number | undefined>>({})
watch(
  () => props.searchFields,
  () => {
    for (const key of Object.keys(params)) delete params[key]
    for (const f of props.searchFields) params[f.prop] = ''
  },
  { immediate: true }
)

const current = computed({
  get: () => props.currentPage,
  set: (v) => emit('update:currentPage', v),
})

const doSearch = () => emit('search', { ...params })

const doReset = () => {
  for (const key of Object.keys(params)) params[key] = ''
  emit('reset')
}
</script>

<template>
  <div class="shs-pro-table">
    <div v-if="showSearch && searchFields.length" class="shs-pro-table__search">
      <div v-for="f in searchFields" :key="f.prop" class="shs-pro-table__search-item">
        <label class="shs-pro-table__search-label">{{ f.label }}</label>
        <ShsSelect
          v-if="f.type === 'select'"
          v-model="params[f.prop]"
          :options="f.options"
          :placeholder="f.placeholder"
          style="width: 180px"
        />
        <ShsInput
          v-else
          v-model="params[f.prop]"
          :placeholder="f.placeholder"
          style="width: 180px"
        />
      </div>
      <div class="shs-pro-table__search-actions">
        <ShsButton type="primary" @click="doSearch"> 查询 </ShsButton>
        <ShsButton @click="doReset"> 重置 </ShsButton>
      </div>
    </div>

    <ShsTable :columns="columns" :data="dataSource" :border="border" :striped="striped" />

    <div v-if="showPagination" class="shs-pro-table__pagination">
      <ShsPagination v-model:current-page="current" :page-size="pageSize" :total="total" />
    </div>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
