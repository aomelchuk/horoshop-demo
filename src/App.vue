<script setup lang="ts">

</script>

<template>
  <div class="menu-stripe">
    <router-link to="/">
      <img src="/logo.png" width="24" height="24" alt="Test task logo" />
    </router-link>
  </div>
  <router-view/>
</template>

<style scoped>
.menu-stripe {
  background-color: #627b7a;
  padding: 0.5rem; /* 8px */
  height: 100%;
}

</style>
