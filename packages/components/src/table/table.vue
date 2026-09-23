<script setup lang="ts">
import { useSlots, type Slots } from 'vue'
import { tableProps } from './props'

defineOptions({ name: 'ShsTable' })

defineProps(tableProps)
const emit = defineEmits<{
  (e: 'row-click', row: Record<string, unknown>, index: number): void
}>()

const slots: Slots = useSlots()
const hasCellSlot = (prop: string) => !!slots[`cell-${prop}`]
</script>

<template>
  <div class="shs-table" :class="{ 'is-border': border, 'is-striped': striped }">
    <table class="shs-table__inner">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.prop"
            :style="{ width: col.width, textAlign: col.align }"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in data"
          :key="i"
          class="shs-table__row"
          @click="emit('row-click', row, i)"
        >
          <td v-for="col in columns" :key="col.prop" :style="{ textAlign: col.align }">
            <slot
              v-if="hasCellSlot(col.prop)"
              :name="`cell-${col.prop}`"
              :row="row"
              :value="row[col.prop]"
            />
            <template v-else>
              {{ row[col.prop] }}
            </template>
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td class="shs-table__empty" :colspan="columns.length">暂无数据</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
