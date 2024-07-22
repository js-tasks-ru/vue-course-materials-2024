<script setup>
</script>

<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
.container {
  max-width: 1008px;
  width: 100%;
  margin: 0 auto;
}

@media all and (max-width: 992px) {
  .container {
    padding: 0 16px;
  }
}

/* В scoped можем определять и стили корневых элементов в слоте */
.container :slotted(p) {
  margin: 10px 0;
}
</style>
