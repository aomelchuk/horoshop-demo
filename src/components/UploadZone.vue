<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, onMounted } from 'vue';

// Props for v-model binding
const props = defineProps<{
  images: (File | string)[];
}>();

const previewUrls = computed(() =>
  props.images.map(item =>
    typeof item === 'string' ? item : URL.createObjectURL(item)
  )
);

// Emitters for v-model updates
const emit = defineEmits<{
  (e: 'update:images', value: File[]): void;
}>();

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (props.images.length) previewSrc.value = URL.createObjectURL(props.images[0]);
});

function onDragOver(event: DragEvent) {
  event.preventDefault();
  isDragging.value = true;
}

function onDragLeave(event: DragEvent) {
  event.preventDefault();
  isDragging.value = false;
}

function onDrop(event: DragEvent) {
  event.preventDefault();
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (files && files.length) {
    // Append new files to the existing images array
    emit('update:images', [...props.images, ...Array.from(files)]);
  }
}

function onBrowseClick() {
  fileInput.value?.click();
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length) {
    const files = Array.from(target.files);
    emit('update:images', [...props.images, ...files]);
  }
}

function removeImage(idx: number) {
  const newFiles = props.images.slice();
  newFiles.splice(idx, 1);
  emit('update:images', newFiles);
}
</script>

<template>
  <div
    v-if="!previewUrls.length"
    class="upload-zone"
    :class="{ 'upload-zone--dragging': isDragging }"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    @click="onBrowseClick"
  >
    <input
      type="file"
      accept="image/*"
      ref="fileInput"
      class="visually-hidden"
      @change="onFileChange"
    />
    <button type="button" class="upload-zone__browse">
      <img src="/icons/icon-img.svg" width="60" height="48" alt="img placeholder">
    </button>
  </div>
  <div v-else class="upload-gallery">
    <div
      v-for="(src, idx) in previewUrls"
      :key="'thumb-' + idx"
      class="upload-gallery__item"
    >
      <img :src="src" alt="Preview" class="upload-gallery__image" />
      <button
        type="button"
        class="upload-gallery__delete"
        @click.stop="removeImage(idx)"
        aria-label="Delete image"
      >
        <img src="/icons/icon-trash.svg" width="16" height="16" alt="remove">
      </button>
    </div>
    <div
      class="upload-zone upload-zone--add"
      :class="{ 'upload-zone--dragging': isDragging }"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @click="onBrowseClick"
    >
      <input
        type="file"
        accept="image/*"
        ref="fileInput"
        class="visually-hidden"
        @change="onFileChange"
      />
      <button type="button" class="upload-zone__browse">
        <img src="/icons/icon-plus.svg" alt="Add image" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upload-zone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  position: relative;

  &--dragging {
    background-color: rgba(0, 0, 0, 0.05);
    border-color: #4A7CF2;
  }

  &__preview {
    display: block;
    max-width: 100%;
    max-height: 150px;
    margin: 0 auto 1rem;
    object-fit: contain;
  }

  &__browse {
    background: none;
    border: none;
    padding: 0;
    margin: 0 auto;
    cursor: pointer;
  }
}

.visually-hidden {
  display: none;
}

.upload-gallery {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.upload-gallery__item {
  flex: 0 0 auto;
  position: relative;
  .upload-gallery__delete {
    position: absolute;
    bottom: 4px;
    right: 4px;
    background: rgba(0,0,0,0.5);
    border: none;
    border-radius: 3px;
    width: 1.5rem;
    height: 1.5rem;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
  }

  &:hover {
    filter: brightness(1.3);
    .upload-gallery__delete {
      cursor: pointer;
      display: flex;
    }
  }
}

.upload-gallery__image {
  display: block;
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.upload-zone--add {
  width: 100px;
  height: 100px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
