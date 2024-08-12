import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import type { MeetupDTO } from '../types/meetups.types.ts'

export function useMeetupsFilter(meetups: Ref<MeetupDTO[]>) {
  const filters = ref({
    date: 'all',
    participation: 'all',
    query: '',
  })

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

  return {
    filters,
    filteredMeetups,
  }
}
