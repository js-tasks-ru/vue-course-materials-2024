import type { MeetupDTO } from './types/meetups.types.ts'

/** URL адрес API */
// export const API_URL = process.env.VITE_API_URL
export const API_URL = 'https://course-vue.javascript.ru/api'

/**
 * Получает список митапов с API
 */
export async function fetchMeetups(): Promise<MeetupDTO[]> {
  const response = await fetch(`${API_URL}/meetups`)
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message)
  }
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

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message)
  }
  return result
}
