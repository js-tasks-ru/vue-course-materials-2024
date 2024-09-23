<script setup lang="ts">
import type { MeetupDTO } from '../types/meetups.types.ts'

defineProps<{
  meetups: MeetupDTO[]
}>()
</script>

<template>
  <div class="meetups-calendar">Календарь</div>
</template>

<style scoped></style>
