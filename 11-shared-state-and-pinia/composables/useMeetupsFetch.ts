import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import { fetchMeetups } from '../api.ts'
import type { MeetupDTO } from '../types/meetups.types.ts'

export function useMeetupsFetch() {
  const meetups: Ref<MeetupDTO[] | null> = ref(null)

  onMounted(async () => {
    try {
      meetups.value = await fetchMeetups()
    } catch (error) {
      console.error(error)
    }
  })

  return {
    meetups,
  }
}
