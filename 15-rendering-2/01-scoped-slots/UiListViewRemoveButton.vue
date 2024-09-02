<script setup lang="ts">
import { UiButton, UiIcon } from '@shgk/vue-course-ui'
</script>

<template>
  <UiButton class="list-item-remove-button" kind="danger" aria-label="Удалить">
    <UiIcon icon="trash" />
  </UiButton>
</template>

<style scoped>
.list-item-remove-button {
  padding: 0;
  border-width: 2px;
}
</style>
