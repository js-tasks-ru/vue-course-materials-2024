<script setup>
</script>

<template>
  <div class="divider-container">
    <slot name="block-1" />
    <hr class="divider" />
    <slot name="block-2" />
    <hr class="divider" />
    <slot name="block-3" />
  </div>
</template>

<style scoped>
.divider {
  border-top: 1px solid var(--grey-3);
  margin: 10px 0;
}
</style>
