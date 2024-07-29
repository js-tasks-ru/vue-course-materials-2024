<script setup>
import { UiPageTitle, UiInput, UiButton } from '@shgk/vue-course-ui'
</script>

<template>
  <div>
    <UiPageTitle>Профиль</UiPageTitle>
    <div class="form-group">
      <UiInput placeholder="Полное имя" />
    </div>
    <div class="form-group">
      <UiInput placeholder="Email" />
    </div>
    <div class="form-group">
      <UiButton kind="primary">Сохранить</UiButton>
    </div>
  </div>
</template>

<style scoped></style>
