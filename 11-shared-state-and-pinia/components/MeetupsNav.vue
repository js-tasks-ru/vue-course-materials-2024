<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
// import { useAuth } from '../composables/useAuth.ts'
import { useAuthStore } from '../stores/auth.ts'

const route = useRoute()

// Потеря реактивности от деструктуризации
// const { isAuthenticated, user } = useAuthStore()

const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)
</script>

<template>
  <nav class="nav">
    <RouterLink v-if="route.meta.showReturnToMeetups" :to="{ name: 'meetups' }" class="nav__link"
      >&larr; Вернуться к списку
    </RouterLink>
    <template v-if="!isAuthenticated">
      <RouterLink :to="{ name: 'login' }" class="nav__link">Вход</RouterLink>
      <RouterLink to="/meetups/create" class="nav__link">Создать митап</RouterLink>
    </template>
    <template v-else>
      <RouterLink :to="{ name: 'user' }" class="nav__link">{{ user.fullname }}</RouterLink>
    </template>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;
}

.nav__link {
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  text-decoration: none;
  padding: 0 20px;
  position: relative;
  display: inline-flex;
}

.nav__link + .nav__link {
  margin-top: 8px;
}

.nav__link:hover {
  color: var(--blue);
}

.nav__link:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-2px, -50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--grey);
}

@media all and (min-width: 992px) {
  .nav {
    flex-direction: row;
    align-items: center;
    margin-left: 0;
  }

  .nav__link,
  .nav__link + .nav__link {
    margin-top: 0;
  }

  .nav__link:first-child:before {
    display: none;
  }
}
</style>
