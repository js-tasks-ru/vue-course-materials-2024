<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { UiContainer, UiAlert, UiRadioGroup, UiInput, UiFormGroup, UiIcon } from '@shgk/vue-course-ui'
import UiButtonGroup from './UiButtonGroup.vue'
import MeetupsList from './MeetupsList.vue'
import MeetupsCalendar from './MeetupsCalendar.vue'
import type { Ref } from 'vue'
import type { MeetupDTO } from '../types/meetups.types.ts'
import { fetchMeetups } from '../api.ts'

const view: Ref<'list' | 'calendar'> = ref('list')
const filters = ref({
  date: 'all',
  participation: 'all',
  query: '',
})

const meetups: Ref<MeetupDTO[] | null> = ref(null)

const filteredMeetups = computed(() => {
  if (!meetups.value) {
    return []
  }

  const dateFilter = (meetup: MeetupDTO) =>
    filters.value.date === 'all' ||
    (filters.value.date === 'past' && new Date(meetup.date) <= new Date()) ||
    (filters.value.date === 'future' && new Date(meetup.date) > new Date())

  const participationFilter = (meetup: MeetupDTO) =>
    filters.value.participation === 'all' ||
    (filters.value.participation === 'organizing' && meetup.organizing) ||
    (filters.value.participation === 'attending' && meetup.attending)

  const searchFilter = (meetup: MeetupDTO) =>
    [meetup.title, meetup.description, meetup.place, meetup.organizer]
      .join(' ')
      .toLowerCase()
      .includes(filters.value.query.toLowerCase())

  return meetups.value.filter(
    (meetup: MeetupDTO) => dateFilter(meetup) && participationFilter(meetup) && searchFilter(meetup),
  )
})

const dateFilterOptions = [
  { value: 'all', label: 'Все' },
  { value: 'past', label: 'Прошедшие' },
  { value: 'future', label: 'Ожидаемые' },
] as const

onMounted(async () => {
  try {
    meetups.value = await fetchMeetups()
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <UiContainer>
    <div class="filters-panel">
      <div class="filters-panel__col">
        <UiRadioGroup v-model="filters.date" :options="dateFilterOptions" name="date" />
      </div>

      <div class="filters-panel__col">
        <UiFormGroup inline>
          <UiInput v-model.trim="filters.query" aria-label="Поиск" placeholder="Поиск!" type="search" rounded small>
            <template #left-icon>
              <UiIcon icon="search" />
            </template>
          </UiInput>
        </UiFormGroup>

        <UiFormGroup inline>
          <UiButtonGroup v-model:view="view" />
        </UiFormGroup>
      </div>
    </div>

    <template v-if="meetups !== null">
      <template v-if="filteredMeetups!.length">
        <MeetupsList v-if="view === 'list'" :meetups="filteredMeetups" />
        <MeetupsCalendar v-else-if="view === 'calendar'" :meetups="filteredMeetups" />
      </template>
      <UiAlert v-else>Митапов по заданным условиям не найдено...</UiAlert>
    </template>
    <UiAlert v-else text="Загрузка..." />
  </UiContainer>
</template>

<style scoped>
.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}
</style>
