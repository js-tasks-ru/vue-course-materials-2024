<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { UiContainer, UiAlert, UiRadioGroup, UiButton } from '@shgk/vue-course-ui'
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

// Называем переменную ref также, как template ref (атрибут ref в шаблоне)
// В его значении будет находиться ссылка на DOM элемент
const inputElement = ref<HTMLInputElement | null>(null)
// Vue 3.5+ - новый API - useTemplateRef
// Переменную можно назвать, как угодно
// const inputElement = useTemplateRef<HTMLInputElement>('inputElement')

function focusInput() {
  inputElement.value?.focus()
}
</script>

<template>
  <UiContainer>
    <div class="filters-panel">
      <div class="filters-panel__col">
        <UiRadioGroup v-model="filters.date" :options="dateFilterOptions" name="date" />
      </div>

      <div class="filters-panel__col">
        <div class="form-group form-group--inline">
          <div class="input-group input-group_icon input-group_icon-left">
            <div class="input-group__icon">
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                class="icon"
              >
                <g stroke="#8ca0cf" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path
                    d="m11 19c4.4183 0 8-3.5817 8-8 0-4.41828-3.5817-8-8-8-4.41828 0-8 3.58172-8 8 0 4.4183 3.58172 8 8 8z"
                  />
                  <path d="m20.9999 21-4.35-4.35" />
                </g>
              </svg>
            </div>
            <input
              ref="inputElement"
              class="form-control form-control--rounded form-control--sm"
              aria-label="Поиск"
              placeholder="Поиск"
              type="search"
              v-model.trim="filters.query"
            />
          </div>
        </div>
        <div class="form-group form-group--inline">
          <UiButtonGroup v-model:view="view" />
        </div>
      </div>

      <div class="filters-panel__col">
        <div class="form-group form-group--inline">
          <UiButton @click="focusInput">Focus</UiButton>
        </div>
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
