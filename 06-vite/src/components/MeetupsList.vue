<script setup lang="ts">
import MeetupsCard from '@/components/MeetupsCard.vue'
import type { MeetupDTO } from "@/types/meetups.types";

const props = defineProps<{
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

