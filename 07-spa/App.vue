<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PageA from './pages/PageA.vue'
import PageB from './pages/PageB.vue'
import PageC from './pages/PageC.vue'

const BASE_URL = '/07-spa'

// Получить путь без базового URL /07-spa/A -> /A
// Упрощённое для примера решение. В настоящем проекте нельзя заменять через replace, нужно убирать начало строки
const getPathWithoutBaseUrl = () => location.pathname.replace(BASE_URL, '')

const currentPath = ref(getPathWithoutBaseUrl(location.pathname))

onMounted(() => {
  window.addEventListener('popstate', updateCurrentPath)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', updateCurrentPath)
})

function push(path) {
  currentPath.value = path
  history.pushState(null, '', BASE_URL + currentPath.value)
}

function updateCurrentPath() {
  currentPath.value = getPathWithoutBaseUrl(location.pathname)
}
</script>

<template>
  <div class="wrapper bg-grey">
    <header class="header">
      <h1 class="logo">App</h1>
      <nav class="nav">
        <a :href="`${BASE_URL}/A`" @click.exact.prevent="push('/A')" class="nav__link">Page A</a>
        <a :href="`${BASE_URL}/B`" @click.exact.prevent="push('/B')" class="nav__link">Page B</a>
        <a :href="`${BASE_URL}/C`" @click.exact.prevent="push('/C')" class="nav__link">Page C</a>
      </nav>
    </header>

    <main class="main container">
      <PageA v-if="currentPath === '/A'" />
      <PageB v-else-if="currentPath === '/B'" />
      <PageC v-else-if="currentPath === '/C'" />
      <div v-else>404 - Not Found</div>
    </main>
  </div>
</template>

<style scoped></style>
