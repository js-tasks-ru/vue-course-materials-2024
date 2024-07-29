<script setup>
import { UiPageTitle, UiContainer, UiButton, UiInput } from '@shgk/vue-course-ui'
import '@shgk/vue-course-ui/meetups/assets/styles/_link.css'
</script>

<template>
  <UiContainer class="page-user">
    <div class="page-user__wrapper">
      <nav aria-label="Разделы профиля">
        <ul class="page-user__nav unstyled-list">
          <li>
            <a class="link" href="/user">Профиль</a>
          </li>
          <li>
            <a class="link" href="/user/security">Безопасность</a>
          </li>
          <li>
            <a class="link" href="/user/settings">Настройки</a>
          </li>
        </ul>
      </nav>
      <div class="page-user__main">
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

        <div>
          <UiPageTitle>Настройки</UiPageTitle>
          <div class="form-group">
            <UiButton kind="danger">Удалить аккаунт</UiButton>
          </div>
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<style scoped>
.unstyled-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.page-user__wrapper {
  display: flex;
  justify-items: stretch;
  padding-top: 48px;
}

.page-user__nav {
  width: 200px;
  padding-right: 20px;
  border-right: 1px solid var(--grey-light);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.page-user__main {
  flex: 1 0 auto;
}
</style>
