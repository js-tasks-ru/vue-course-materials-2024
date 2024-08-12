<script setup>
import { computed, ref } from 'vue'
import MeetupsHeader from './components/MeetupsHeader.vue'
import MeetupsFooter from './components/MeetupsFooter.vue'
import PageMeetups from './components/PageMeetups.vue'

function checkIsMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

const isMobile = computed(() => checkIsMobile())

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)
</script>

<template>
  <div class="wrapper">
    <MeetupsHeader />
    <main class="main">
      <p>
        Is it mobile? {{ isMobile }}
      </p>
      <p>
        Window size is: {{ windowWidth }}x{{ windowHeight }}
      </p>

      <PageMeetups />
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
