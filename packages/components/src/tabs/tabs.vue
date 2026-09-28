<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ShsIcon } from '../icon'
import { tabsProps, type TabItem } from './props'

defineOptions({ name: 'ShsTabs' })

const props = defineProps(tabsProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'close', name: string): void
}>()

const select = (tab: TabItem) => {
  if (tab.disabled) return
  emit('update:modelValue', tab.name)
  emit('change', tab.name)
}

/** 单个 tab 是否可关闭：优先 tab.closable，其次 tabs 级 closable */
const isClosable = (tab: TabItem) => (tab.closable ?? props.closable) && !tab.disabled

const close = (tab: TabItem) => {
  if (tab.disabled) return
  emit('close', tab.name)
}

// ---------- 溢出滑动 ----------
const navScrollRef = ref<HTMLElement>()
const hasOverflow = ref(false)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)
const SCROLL_STEP = 180

const updateNavState = () => {
  const el = navScrollRef.value
  if (!el) return
  hasOverflow.value = el.scrollWidth > el.clientWidth + 1
  canScrollPrev.value = el.scrollLeft > 1
  canScrollNext.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 1
}

const scrollByStep = (dir: -1 | 1) => {
  const el = navScrollRef.value
  if (!el) return
  el.scrollBy({ left: dir * SCROLL_STEP, behavior: 'smooth' })
}

// 关闭后容器宽度变化，重新计算状态
watch(
  () => props.tabs,
  async () => {
    await nextTick()
    updateNavState()
  }
)

let observer: ResizeObserver | undefined
onMounted(() => {
  updateNavState()
  const el = navScrollRef.value
  if (el && 'ResizeObserver' in window) {
    observer = new ResizeObserver(() => updateNavState())
    observer.observe(el)
  }
  // 监听滚动同步按钮可用态
  el?.addEventListener('scroll', updateNavState, { passive: true })
})
onBeforeUnmount(() => {
  observer?.disconnect()
  navScrollRef.value?.removeEventListener('scroll', updateNavState)
})
</script>

<template>
  <div class="shs-tabs" :class="`shs-tabs--${type}`">
    <div class="shs-tabs__header">
      <button
        v-show="hasOverflow"
        type="button"
        class="shs-tabs__nav-btn is-prev"
        :disabled="!canScrollPrev"
        aria-label="向前滚动"
        @click="scrollByStep(-1)"
      >
        <shs-icon name="arrow-left" :size="14" />
      </button>

      <div ref="navScrollRef" class="shs-tabs__nav-scroll">
        <div
          v-for="tab in tabs"
          :key="tab.name"
          class="shs-tabs__tab"
          :class="{
            'is-active': modelValue === tab.name,
            'is-disabled': tab.disabled,
            'is-closable': isClosable(tab),
          }"
          @click="select(tab)"
        >
          <span class="shs-tabs__tab-label">{{ tab.label }}</span>
          <span
            v-if="isClosable(tab)"
            class="shs-tabs__close"
            role="button"
            :aria-label="`关闭 ${tab.label}`"
            @click.stop="close(tab)"
          >
            <shs-icon name="close" :size="12" />
          </span>
        </div>
      </div>

      <button
        v-show="hasOverflow"
        type="button"
        class="shs-tabs__nav-btn is-next"
        :disabled="!canScrollNext"
        aria-label="向后滚动"
        @click="scrollByStep(1)"
      >
        <shs-icon name="arrow-right" :size="14" />
      </button>
    </div>
    <div class="shs-tabs__content">
      <slot :name="`pane-${modelValue}`" />
    </div>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
