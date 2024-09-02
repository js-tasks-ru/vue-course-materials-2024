<script setup>
import { ref } from 'vue'
import UiListView from './UiListView.vue'
import UiListViewUsers from './UiListViewUsers.vue'
import UiListViewMeetups from './UiListViewMeetups.vue'
import { strings, users, meetups } from './fixtures.ts'
const strings = ref(fixtures.strings)
const users = ref(fixtures.users)
const meetups = ref(fixtures.meetups)
</script>

<template>
  <div class="sample">
    <div>
      <h1>UiListView</h1>
      <UiListView v-model:items="strings" />
    </div>
    <div>
      <h1>UiListViewUsers</h1>
      <UiListViewUsers v-model:items="users" />
    </div>
    <div>
      <h1>UiListViewMeetups</h1>
      <UiListViewMeetups v-model:items="meetups" />
    </div>
  </div>
</template>

<style scoped>
.sample {
  display: flex;
  justify-content: space-around;

  & > * {
    flex: 0 1 auto;
  }
}
</style>
