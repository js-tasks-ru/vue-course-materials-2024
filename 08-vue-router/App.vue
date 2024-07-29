<script setup>
import MeetupsHeader from './components/MeetupsHeader.vue'
import MeetupsFooter from './components/MeetupsFooter.vue'
import PageMeetups from './components/PageMeetups.vue'
import PageUser from './components/PageUser.vue'
</script>

<template>
  <div class="wrapper">
    <MeetupsHeader />
    <main class="main">
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
