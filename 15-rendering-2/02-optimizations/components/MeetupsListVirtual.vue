<script setup lang="ts">
import MeetupsCard from './MeetupsCard.vue'
import type { MeetupDTO } from '../types/meetups.types.ts'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

defineProps<{
  meetups: MeetupDTO[]
}>()
</script>

<template>
  <RecycleScroller
    v-slot="{ item: meetup }"
    key-field="id"
    :items="meetups"
    class="scroller"
    list-tag="ul"
    list-class="meetups-list"
    item-tag="li"
    item-class="meetups-list__item"
    :item-size="240"
  >
    <a :href="`/meetups/${meetup.id}`" class="meetups-list__item-link" tabindex="0">
      <MeetupsCard :meetup="meetup" />
    </a>
  </RecycleScroller>
</template>

<style scoped>
.scroller {
  height: calc(100vh - calc(162px + 152px + 182px)); /* header + filters + footer */
}

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
