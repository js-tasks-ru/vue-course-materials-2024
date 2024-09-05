<script setup>
</script>

<template>
  <div class="accordion">
    <slot />
  </div>
</template>

<style scoped>
.accordion {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  overflow: hidden;
}
</style>
