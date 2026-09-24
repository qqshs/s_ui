<script setup lang="ts">
import { ref } from 'vue'
import { ShsIcon } from '../icon'
import { uploadProps, type UploadFile } from './props'

defineOptions({ name: 'ShsUpload' })

const props = defineProps(uploadProps)
const emit = defineEmits<{
  (e: 'update:modelValue', list: UploadFile[]): void
  (e: 'change', list: UploadFile[]): void
  (e: 'remove', uid: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const filesToUpload = (files: FileList) =>
  Array.from(files).map(
    (f) =>
      ({
        uid: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: f.name,
        size: f.size,
        raw: f,
        status: 'ready',
        url: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
      }) as UploadFile
  )

const openPicker = () => {
  if (props.disabled) return
  inputRef.value?.click()
}

const onChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || !files.length) return
  const next = filesToUpload(files)
  const list = props.multiple ? [...props.modelValue, ...next] : next
  emit('update:modelValue', list)
  emit('change', list)
  ;(e.target as HTMLInputElement).value = ''
}

const remove = (uid: string) => {
  emit(
    'update:modelValue',
    props.modelValue.filter((f) => f.uid !== uid)
  )
  emit('remove', uid)
}

const formatSize = (n: number) => {
  if (n >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`
  if (n >= 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${n} B`
}
</script>

<template>
  <div class="shs-upload" :class="{ 'is-disabled': disabled }">
    <input
      ref="inputRef"
      type="file"
      class="shs-upload__input"
      :accept="accept"
      :multiple="multiple"
      @change="onChange"
    />
    <div class="shs-upload__trigger" @click="openPicker">
      <ShsIcon name="search" :size="16" />
      <span class="shs-upload__tip">{{ tip }}</span>
    </div>
    <ul v-if="modelValue.length" class="shs-upload__list">
      <li v-for="f in modelValue" :key="f.uid" class="shs-upload__item">
        <span class="shs-upload__name">{{ f.name }}</span>
        <span class="shs-upload__size">{{ formatSize(f.size) }}</span>
        <button v-if="!disabled" class="shs-upload__remove" @click="remove(f.uid)">×</button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" src="./style/index.scss"></style>
