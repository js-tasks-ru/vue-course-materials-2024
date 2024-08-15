<script setup>
import { UiContainer } from '@shgk/vue-course-ui'
</script>

<template>
  <footer class="footer">
    <UiContainer>&copy; 2020-{{ new Date().getFullYear() }}</UiContainer>
  </footer>
</template>

<style scoped>
.footer {
  padding: 100px 0 60px;
  text-align: center;
}
</style>
