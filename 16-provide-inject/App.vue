<script setup>
import { provide } from 'vue'
import { UiContainer } from '@shgk/vue-course-ui'
import MeetupForm from './components/MeetupForm.vue'
import { useMeetupFormProvider } from './composables/useMeetupForm.ts'

provide('config', { apiUrl: '/api' })

const { meetup } = useMeetupFormProvider()
</script>

<template>
  <div class="wrapper">
    <main class="main">
      <UiContainer>
        <MeetupForm />
        <pre>{{ meetup }}</pre>
      </UiContainer>
    </main>
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
