<script setup lang="ts">

</script>

<template>
  <a href="/template/1/edit" class="preview-card">
    <div class="preview-card__thumb">
       <img src="/designs/ostrov.png" width="300" height="400" alt="Ostrov preview" class="preview-card__image" />
    </div>
    <div class="preview-card__info">
      <span class="preview-card__number">105</span>
      <h3 class="preview-card__title">Ostrov</h3>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.preview-card {
  display: block;
  border: 1px solid transparent;
  border-radius: 8px;
  text-decoration: none;
  transition: box-shadow 0.2s;

  &:hover {
    cursor: pointer;

    .preview-card__image {
      filter: brightness(0.7);
    }
  }

  &__thumb {
    width: 100%;

    & .preview-card__image {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      object-fit: contain;
      transition: filter 0.3s ease;

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
  }

  &__number {
    width: fit-content;
    height: 16px;
    border-radius: 1rem;
    background-color: #fff;
    color: #000000;
    font-weight: 400;
    font-size: 11px;
    padding: .1rem .5rem;
  }

  &__title {
    font-size: 1rem;
    color: #fff;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
}
</style>
