<script setup lang="ts">
import type { VNode } from 'vue'

const slots = defineSlots<{
  [key: `block-${number}`]: () => VNode[]
}>()
</script>

<template>
  <div class="divider-container">
    <template v-for="(slotName, index) in Object.keys(slots)">
      <hr v-if="index !== 0" class="divider" />
      <slot :name="slotName as keyof typeof slots" />
    </template>
  </div>
</template>

<style scoped>
.divider {
  border-top: 1px solid var(--grey-3);
  margin: 10px 0;
}
</style>
