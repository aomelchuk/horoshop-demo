<script setup lang="ts">
import UploadZone from '../components/UploadZone.vue';
import {onMounted, ref} from 'vue';
import type { TemplateForm } from '../types/template'
import {useTemplateStore} from "../stores/templates.ts";

const props = defineProps<{ id?: number }>();
const store = useTemplateStore()

const emit = defineEmits<{
  (e: 'save'): void,
  (e: 'delete'): void
}>()


const form = ref<TemplateForm>({
  published: false,
  code: null,
  name: '',
  url: '',
  images: []
});

const isLoading = ref(false);


onMounted(() => {
  if (props.id) {
    form.value = store.getTemplateByCode(props.id) as TemplateForm;
  }
})

function save() {
  isLoading.value = true;
  setTimeout(() => {
  if (props.id) {
    store.updateTemplate(form.value)
  } else {
   store.addTemplate(form.value)
  }
    isLoading.value = false;
    emit('save')
  }, 1000)
}

function deleteTemplate() {
  store.deleteTemplate(form.value.code || 0)
  emit('delete')
}
</script>

<template>
  <div class="template-page">
    <header class="template-page__header">
      <div class="template-page__toggle">
        <label class="toggle-switch">
          <input
            type="checkbox"
            id="published"
            v-model="form.published"
          />
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-label">
          {{ form.published ? 'Опублікований' : 'Неопублікований' }}
        </span>
      </div>
      <div class="template-page__btns">
        <button v-if="props.id" type="button" class="h-btn h-btn--sm h-btn--outlined  template-page-delete-btn" @click="deleteTemplate">Видалити</button>
        <button type="button" class="h-btn h-btn--sm template-page__save" @click="save">
          <img v-show="isLoading" src="/spinner.svg" class="spinner" width="13" height="13" alt="spinner">
          Зберегти і вийти
        </button>
      </div>

    </header>
    <form class="template-page__form">
      <UploadZone
        v-model:images="form.images"
        class="template-page__upload"
      />
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
      <div class="template-page__fields">
        <input
        v-model="form.url"
        type="url"
        placeholder="https://design###.horoshop.ua/"
        class="template-page__input template-page__input--url"
      />
      </div>
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

  &__save {
    display: flex;
    gap: .5rem;
    align-items: center;
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
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

