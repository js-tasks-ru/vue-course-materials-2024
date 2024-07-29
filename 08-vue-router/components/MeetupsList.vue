<script setup lang="ts">
import MeetupsCard from './MeetupsCard.vue'
import type { MeetupDTO } from '../types/meetups.types.ts'

defineProps<{
  meetups: MeetupDTO[]
}>()
</script>

<template>
  <ul class="meetups-list">
    <li v-for="meetup in meetups" :key="meetup.id" class="meetups-list__item">
      <a :href="`/meetups/${meetup.id}`" class="meetups-list__item-link" tabindex="0">
        <MeetupsCard :meetup="meetup" />
      </a>
    </li>
  </ul>
</template>

<style scoped>
/* _meetups-list.css */
.meetups-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.meetups-list__item {
  margin: 0 0 32px 0;
  text-decoration: none;
}

.meetups-list__item-link {
  text-decoration: none;
  color: inherit;
}
</style>
