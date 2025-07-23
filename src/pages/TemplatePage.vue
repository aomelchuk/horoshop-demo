<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Template from "../components/Template.vue";

 const route = useRoute();
 const isEdit = Boolean(route.params.id);
const router = useRouter();
function goBack() {
  router.push('/');
}
</script>

<template>
  <div class="template-page-wrapper">
   <button type="button" class="template-page-header__back" @click="goBack">
     <img src="/icons/icon-back.svg" width="24" height="24" alt="">
   </button>
    <Template :id="isEdit ? 1 : null"/>
  </div>
</template>

<style lang="scss" scoped>
.template-page-wrapper {
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: flex-start;
}

</style>
