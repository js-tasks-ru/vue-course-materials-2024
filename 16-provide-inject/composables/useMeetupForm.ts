import { createMeetup } from '../services/meetups.service.ts'

export function useMeetupForm(initialState = createMeetup()) {}
