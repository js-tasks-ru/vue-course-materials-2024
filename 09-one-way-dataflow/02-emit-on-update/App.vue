<script setup>
import { ref } from 'vue'
import { UiContainer } from '@shgk/vue-course-ui'
import MeetupForm from './components/MeetupForm.vue'
import { createMeetup } from './services/meetups.service.ts'

const meetup = ref(createMeetup())
</script>

<template>
  <div class="wrapper">
    <main class="main">
      <UiContainer>
        <MeetupForm :meetup="meetup" />
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
