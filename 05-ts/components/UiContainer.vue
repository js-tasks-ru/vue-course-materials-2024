<script setup lang="ts">
import type { VNode } from 'vue'
defineSlots<{
  // default(): any,
  default: () => VNode[]
}>()
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
</style>
