<script setup>
import { UiContainer } from '@shgk/vue-course-ui'
import '@shgk/vue-course-ui/meetups/assets/styles/_link.css'
</script>

<template>
  <UiContainer class="page-user">
    <div class="page-user__wrapper">
      <nav aria-label="Разделы профиля">
        <ul class="page-user__nav unstyled-list">
          <li>
            <RouterLink class="link" to="/user">Профиль</RouterLink>
          </li>
          <li>
            <RouterLink class="link" to="/user/security">Безопасность</RouterLink>
          </li>
          <li>
            <RouterLink class="link" to="/user/settings">Настройки</RouterLink>
          </li>
        </ul>
      </nav>
      <div class="page-user__main">
        <RouterView />
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
