<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { themeSettingProps } from './props'
import { ShsIcon } from '../icon'
import { ShsModal } from '../modal'
import { normalizeHex, lighten, darken, isSameHex } from './color'

defineOptions({ name: 'ShsThemeSetting' })

const props = defineProps(themeSettingProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
  (e: 'apply', color: string): void
  (e: 'confirm', color: string): void
  (e: 'cancel'): void
}>()

/** 内部开关状态：未绑 v-model 也能自管理面板显隐，绑了 v-model 则双向同步 */
const internalOpen = ref(!!props.modelValue)

const visible = computed({
  get: () => internalOpen.value,
  set: (val) => {
    internalOpen.value = val
    emit('update:modelValue', val)
  },
})

// 外部 v-model 变化时同步到内部状态
watch(
  () => props.modelValue,
  (val) => {
    internalOpen.value = !!val
  }
)

/** 已确认的主题主色（取消/非确认关闭时还原到它） */
const appliedColor = ref(normalizeHex(props.primaryColor))
/** 面板内当前选中的颜色 */
const selectedColor = ref(normalizeHex(props.primaryColor))
/** 是否处于未确认的预览态 */
const previewing = ref(false)

/** 读取根节点当前主色 */
function readRootPrimary(): string {
  if (typeof document === 'undefined') return appliedColor.value
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue('--shs-color-primary')
    .trim()
  return v ? normalizeHex(v, appliedColor.value) : appliedColor.value
}

/** 将主色及派生 hover / active 写入根节点，立即生效 */
function applyToRoot(primary: string) {
  if (typeof document === 'undefined') return
  const p = normalizeHex(primary)
  const root = document.documentElement.style
  root.setProperty('--shs-color-primary', p)
  root.setProperty('--shs-color-primary-hover', lighten(p, 0.14))
  root.setProperty('--shs-color-primary-active', darken(p, 0.14))
}

function open() {
  appliedColor.value = readRootPrimary()
  selectedColor.value = appliedColor.value
  previewing.value = false
  visible.value = true
  emit('open')
}

function close() {
  // 未确认的预览一律还原为已确认主题色
  if (previewing.value) applyToRoot(appliedColor.value)
  previewing.value = false
  selectedColor.value = appliedColor.value
  visible.value = false
  emit('close')
}

/** 选择颜色：实时预览，确认后才正式生效 */
function selectColor(color: string) {
  selectedColor.value = normalizeHex(color)
  previewing.value = true
  applyToRoot(selectedColor.value)
}

function handleConfirm() {
  appliedColor.value = selectedColor.value
  previewing.value = false
  applyToRoot(appliedColor.value)
  emit('apply', appliedColor.value)
  emit('confirm', appliedColor.value)
  if (props.closeOnConfirm) visible.value = false
}

function handleCancel() {
  emit('cancel')
  close()
}

function handleTrigger() {
  if (visible.value) close()
  else open()
}

// 面板关闭（触发开关 / 遮罩 / 关闭按钮 / 外部 v-model）时，还原未确认的预览
watch(
  () => internalOpen.value,
  (val) => {
    if (!val && previewing.value) {
      applyToRoot(appliedColor.value)
      previewing.value = false
      selectedColor.value = appliedColor.value
    }
  }
)

// 外部修改 primaryColor 时同步回显
watch(
  () => props.primaryColor,
  (v) => {
    appliedColor.value = normalizeHex(v)
    if (!previewing.value) selectedColor.value = appliedColor.value
  }
)
</script>

<template>
  <div class="shs-theme-setting">
    <!-- 触发：默认齿轮图标按钮，可通过 #trigger 插槽自定义 -->
    <button
      type="button"
      class="shs-theme-setting__trigger"
      :aria-label="title"
      @click="handleTrigger"
    >
      <slot name="trigger">
        <shs-icon name="settings" :size="18" />
        <span class="shs-theme-setting__dot" :style="{ background: appliedColor }" />
      </slot>
    </button>

    <shs-modal
      :model-value="visible"
      :title="title"
      :width="width"
      :confirm-text="confirmText"
      :cancel-text="cancelText"
      @update:model-value="visible = $event"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <div class="shs-theme-setting__body">
        <p class="shs-theme-setting__label">主题色</p>
        <div class="shs-theme-setting__swatches">
          <button
            v-for="color in presetColors"
            :key="color"
            type="button"
            class="shs-theme-setting__swatch"
            :class="{ 'is-active': isSameHex(selectedColor, color) }"
            :style="{ background: color }"
            :aria-label="`主题色 ${color}`"
            @click="selectColor(color)"
          >
            <shs-icon v-if="isSameHex(selectedColor, color)" name="check" :size="14" color="#fff" />
          </button>
        </div>

        <p class="shs-theme-setting__label">自定义颜色</p>
        <div class="shs-theme-setting__custom">
          <input
            type="color"
            class="shs-theme-setting__picker"
            :value="selectedColor"
            aria-label="自定义主题色"
            @input="selectColor(($event.target as HTMLInputElement).value)"
          />
          <span class="shs-theme-setting__hex">{{ selectedColor }}</span>
        </div>

        <div class="shs-theme-setting__preview">
          <p class="shs-theme-setting__label">预览</p>
          <div class="shs-theme-setting__admin">
            <!-- 顶栏 -->
            <div class="shs-admin-nav">
              <span class="shs-admin-nav__brand" />
              <span class="shs-admin-nav__bar" />
              <span class="shs-admin-nav__avatar" />
            </div>
            <!-- 主体：侧边栏 + 内容 -->
            <div class="shs-admin-layout">
              <aside class="shs-admin-side">
                <div class="shs-admin-menu">
                  <div class="shs-admin-menu__item is-active" />
                  <div class="shs-admin-menu__item" />
                  <div class="shs-admin-menu__item" />
                  <div class="shs-admin-menu__item" />
                  <div class="shs-admin-menu__item" />
                </div>
              </aside>
              <main class="shs-admin-main">
                <!-- 统计卡片 -->
                <div class="shs-admin-cards">
                  <div class="shs-admin-card">
                    <span class="shs-admin-card__num" />
                    <span class="shs-admin-card__label" />
                  </div>
                  <div class="shs-admin-card">
                    <span class="shs-admin-card__num" />
                    <span class="shs-admin-card__label" />
                  </div>
                  <div class="shs-admin-card">
                    <span class="shs-admin-card__num" />
                    <span class="shs-admin-card__label" />
                  </div>
                </div>
                <!-- 操作区 -->
                <div class="shs-admin-toolbar">
                  <span class="shs-admin-btn is-primary" />
                  <span class="shs-admin-btn" />
                </div>
                <!-- 数据表格 -->
                <div class="shs-admin-table">
                  <div class="shs-admin-table__row is-head">
                    <span class="shs-admin-table__bar" />
                    <span class="shs-admin-table__bar" />
                    <span class="shs-admin-table__bar" />
                  </div>
                  <div class="shs-admin-table__row">
                    <span class="shs-admin-table__bar" />
                    <span class="shs-admin-table__bar is-tag" />
                    <span class="shs-admin-table__bar is-link" />
                  </div>
                  <div class="shs-admin-table__row">
                    <span class="shs-admin-table__bar" />
                    <span class="shs-admin-table__bar is-tag" />
                    <span class="shs-admin-table__bar is-link" />
                  </div>
                  <div class="shs-admin-table__row">
                    <span class="shs-admin-table__bar" />
                    <span class="shs-admin-table__bar is-tag" />
                    <span class="shs-admin-table__bar is-link" />
                  </div>
                </div>
              </main>
            </div>
            <!-- 页脚：版权 / 版本 -->
            <div class="shs-admin-footer">
              <span class="shs-admin-footer__copy">© 2026 shs_ui · 保留所有权利</span>
              <span class="shs-admin-footer__version">v0.0.1</span>
            </div>
          </div>
        </div>
      </div>
    </shs-modal>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
