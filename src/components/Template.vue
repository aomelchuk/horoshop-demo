<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{ id?: string }>();


const form = ref({
  published: false,
  code: '',
  name: '',
  url: '',
  file: null as File | null
});

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const previewSrc = ref<string | null>(null);

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
    form.value.file = files[0];
    previewSrc.value = URL.createObjectURL(form.value.file);
  }
}

function onBrowseClick() {
  fileInput.value?.click();
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length) {
    form.value.file = target.files[0];
    previewSrc.value = URL.createObjectURL(form.value.file);
  }
}
</script>

<template>
  <div :id="props.id" class="template-page">
    <header class="template-page__header">
      <div class="template-page__toggle">
        <input type="checkbox" id="published" v-model="form.published" />
        <label for="published">Неопубликован</label>
      </div>
      <div class="template-page__btns">
        <button v-if="props.id" type="button" class="h-btn h-btn--sm h-btn--outlined  template-page-delete-btn">Видалити</button>
        <button type="button" class="h-btn h-btn--sm template-page__save">Зберегти і вийти</button>
      </div>

    </header>
    <form class="template-page__form">
      <div class="template-page__upload">
        <input
          type="file"
          accept="image/*"
          ref="fileInput"
          class="visually-hidden"
          @change="onFileChange"
        />
        <div class="upload-zone" :class="{ 'upload-zone--dragging': isDragging }" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave" @drop.prevent="onDrop" @click="onBrowseClick">

            <button type="button" class="upload-zone__browse">
              <img
                  v-if="previewSrc"
                  :src="previewSrc"
                  alt="Preview"
                  class="upload-zone__preview"
              />
              <img v-else src="/icons/icon-img.svg"  width="60" height="48"  alt="download image">
            </button>
        </div>
      </div>
      <div class="template-page__fields">
        <input
          v-model="form.code"
          type="text"
          placeholder="###"
          class="template-page__input template-page__input--code"
        />
        <input
          v-model="form.name"
          type="text"
          placeholder="Назва дизайну"
          class="template-page__input template-page__input--name"
        />
      </div>
      <input
        v-model="form.url"
        type="url"
        placeholder="https://design###.horoshop.ua/"
        class="template-page__input template-page__input--url"
      />
    </form>
  </div>
</template>

<style scoped lang="scss">
.template-page {
  padding: 1rem;

  &__btns {
    display: flex;
    align-items: center;
    gap: .5rem;

    .template-page-delete-btn {
      color: #E61610;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    justify-content: space-between;

    &__toggle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-left: auto;

      input {
        width: 1.5rem;
        height: 1rem;
      }

      label {
        font-size: 0.9rem;
      }
    }

    &__save {
      margin-left: auto;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__upload {
    .upload-zone {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;

      &--dragging {
        background-color: rgba(0, 0, 0, 0.05);
        border-color: #4A7CF2;
      }

      &__icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.5rem;
      }

      &__text {
        font-size: 0.9rem;

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
        color: #007bff;
        cursor: pointer;
        text-decoration: underline;
        padding: 0;
        margin: 0;

        img {
          margin: 0;
        }
      }
    }
  }

  &__fields {
    display: flex;
    gap: 0.5rem;

    .template-page__input {
      flex: 1;
    }
  }

  &__input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    width: 100%;

    &--code {
      max-width: 4rem;
    }
  }
}
</style>
