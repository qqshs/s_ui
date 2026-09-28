<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { watermarkProps } from './props'

defineOptions({ name: 'ShsWatermark' })

const props = defineProps(watermarkProps)

const background = ref('')

const baseFont = computed(() => `${props.fontWeight} ${props.fontSize}px ${props.fontFamily}`)

const maskStyle = computed(() => ({
  backgroundImage: background.value ? `url(${background.value})` : '',
  backgroundRepeat: 'repeat',
  zIndex: props.zIndex,
}))

/** 计算单个水印单元尺寸 */
function measure() {
  const fallbackWidth = props.width ?? 120
  const fallbackHeight = props.height ?? 64
  if (props.image) {
    return {
      width: props.width ?? fallbackWidth,
      height: props.height ?? fallbackHeight,
    }
  }
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const lines = Array.isArray(props.content) ? props.content : [props.content]
  if (!ctx) {
    return { width: fallbackWidth, height: fallbackHeight }
  }
  ctx.font = baseFont.value
  const maxTextWidth = Math.max(...lines.map((line) => ctx.measureText(line).width), props.fontSize)
  return {
    width: props.width ?? maxTextWidth + 32,
    height: props.height ?? props.fontSize * lines.length + 16,
  }
}

/** 加载图片并绘制到画布 */
function drawImage(ctx: CanvasRenderingContext2D, size: { width: number; height: number }) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, -size.width / 2, -size.height / 2, size.width, size.height)
      resolve()
    }
    img.onerror = () => resolve()
    img.src = props.image
  })
}

async function render() {
  if (!props.content && !props.image) {
    background.value = ''
    return
  }
  const size = measure()
  const canvas = document.createElement('canvas')
  canvas.width = size.width + props.gapX
  canvas.height = size.height + props.gapY
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.translate(size.width / 2 + (props.offsetLeft ?? 0), size.height / 2 + (props.offsetTop ?? 0))
  ctx.rotate((props.rotate * Math.PI) / 180)
  ctx.globalAlpha = props.opacity

  if (props.image) {
    await drawImage(ctx, size)
  } else {
    ctx.fillStyle = props.color
    ctx.font = baseFont.value
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const lines = Array.isArray(props.content) ? props.content : [props.content]
    lines.forEach((line, i) => {
      ctx.fillText(line, 0, (i - (lines.length - 1) / 2) * props.fontSize)
    })
  }
  background.value = canvas.toDataURL()
}

let resizeHandler: (() => void) | undefined

onMounted(() => {
  render()
  resizeHandler = () => render()
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
})

watch(
  () => [
    props.content,
    props.image,
    props.fontSize,
    props.fontFamily,
    props.fontWeight,
    props.color,
    props.rotate,
    props.gapX,
    props.gapY,
    props.offsetLeft,
    props.offsetTop,
    props.width,
    props.height,
    props.opacity,
  ],
  () => render()
)
</script>

<template>
  <div class="shs-watermark" :class="{ 'shs-watermark--fullscreen': fullScreen }">
    <slot />
    <div v-if="background" class="shs-watermark__mask" :style="maskStyle" aria-hidden="true" />
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
