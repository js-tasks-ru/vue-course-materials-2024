<script setup>
import MeetupsHeader from './components/MeetupsHeader.vue'
import MeetupsFooter from './components/MeetupsFooter.vue'
import { useWindowSize } from './composables/useWindowSize.ts'

const { width, height } = useWindowSize()
</script>

<template>
  <div class="wrapper">
    <MeetupsHeader />
    <main class="main">
      <p>
        Window size is: {{ width }}x{{ height }}
      </p>

      <RouterView />
    </main>
    <MeetupsFooter />
  </div>
</template>

<style>
.wrapper {
  background-color: var(--grey-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}
</style>
