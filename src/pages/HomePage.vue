<script setup lang="ts">
import { useRouter } from 'vue-router';
import TemplatePerview from "../components/TemplatePerview.vue";
const router = useRouter();
function goToAdd() {
  router.push('/template/add');
}
</script>

<template>
  <div class="home-page page-container">
    <div class="home-page__header">
      <h1>Всі дизайни</h1>
      <button @click="goToAdd" class="h-btn h-btn--sm">Додати дизайн</button>
    </div>
    <div class="home-page__body">
      <TemplatePerview v-for="i in 8" :key="i"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  background-color: #2C3D39;
  padding: 1.7rem 2rem;

  &__header {
    display: flex;
    justify-content: space-between;

    h1 {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 1.5rem; /* 24px */
      color: #fff;

      padding: 0;
      line-height: 1;
      margin: 0;
    }
  }

  &__body {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(4, minmax(300px,1fr));
    gap: 1.5rem;
  }

  @media (max-width: 1390px) {
    &__body {
      grid-template-columns: repeat(3, minmax(300px, 1fr));
    }
  }

  @media (max-width: 1065px) {
    &__body {
      grid-template-columns: repeat(2, minmax(200px, 1fr));
    }
  }

  @media (max-width: 600px) {
    &__body {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
