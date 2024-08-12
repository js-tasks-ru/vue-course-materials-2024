<script setup lang="ts">
import { computed, toRef } from 'vue'
import { UiCard, UiBadge, UiIcon } from '@shgk/vue-course-ui'
import type { MeetupDTO } from '../types/meetups.types.ts'
import { formatAsIsoDate, formatAsLocalDate } from '../utils/dateFormatters.ts'

const props = defineProps<{
  meetup: MeetupDTO,
}>()

const meetup = toRef(() => props.meetup)

const isoDate = computed(() => formatAsIsoDate(meetup.value.date))

const localDate = computed(() => formatAsLocalDate(meetup.value.date))
</script>

<template>
  <UiCard :cover="meetup.image" class="meetup-card">
    <template #header>
      <header>
        <h3>{{ meetup.title }}</h3>
      </header>
    </template>

    <UiBadge v-if="meetup.organizing" kind="success" class="meetup-card__badge">Организую</UiBadge>
    <UiBadge v-if="meetup.attending" kind="primary" class="meetup-card__badge">Участвую</UiBadge>

    <ul class="meetup-info">
      <li class="meetup-info__item">
        <UiIcon icon="user" class="meetup-info__icon" />
        {{ meetup.organizer }}
      </li>
      <li class="meetup-info__item">
        <UiIcon icon="map" class="meetup-info__icon" />
        {{ meetup.place }}
      </li>
      <li class="meetup-info__item">
        <UiIcon icon="cal-lg" class="meetup-info__icon" />
        <time :datetime="isoDate">{{ localDate }}</time>
      </li>
    </ul>
  </UiCard>
</template>

<style scoped>
/* _meetup-card.css */

.meetup-card {
  position: relative;
}

.meetup-card__badge {
  position: absolute;
  top: 0;
  right: 0;
}

/* MeetupInfo.vue */
.meetup-info {
  margin: 0;
  padding: 0;
}

.meetup-info li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.meetup-info li:last-child {
  margin: 0;
}

.meetup-info__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
