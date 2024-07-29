<script setup>
import { UiPageTitle, UiInput, UiButton } from '@shgk/vue-course-ui'
</script>

<template>
  <div>
    <UiPageTitle>Безопасность</UiPageTitle>
    <div class="form-group">
      <UiInput placeholder="Пароль" type="password" />
    </div>
    <div class="form-group">
      <UiInput placeholder="Повтор пароля" type="password" />
    </div>
    <div class="form-group">
      <UiButton kind="primary">Сохранить</UiButton>
    </div>
  </div>
</template>

<style scoped></style>
