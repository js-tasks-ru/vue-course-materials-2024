import type { MeetupDTO } from './types/meetups.types.ts'

/** URL адрес API */
// export const API_URL = process.env.VITE_API_URL
export const API_URL = 'https://course-vue.javascript.ru/api'

/**
 * Получает список митапов с API
 */
export async function fetchMeetups(): Promise<MeetupDTO[]> {
  console.time('Fetch meetups')

  const response = await fetch(`${API_URL}/meetups`)
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message)
  }

  // Increase amount of data
  const initialCount = result.length
  const COUNT = 2000
  for (let i = 0; result.length < COUNT; i++) {
    result.push({
      id: result.length + 1,
      ...result[i % initialCount],
    })
  }
  // Add random changes
  result[1].title = Math.random().toString()
  if (Math.random() > 0.5) {
    result.shift();
  }

  console.timeEnd('Fetch meetups')

  return result
}

/**
 * Получает митап с API по ID
 * @param meetupId
 */
export async function fetchMeetup(meetupId: number): Promise<MeetupDTO> {
  const response = await fetch(`${API_URL}/meetups/${meetupId}`)
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message)
  }
  return result
}
