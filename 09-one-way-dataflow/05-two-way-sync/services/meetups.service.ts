import type { MeetupAgendaItemDTO, MeetupDTO } from '../types/meetups.types.ts'

export function createMeetup(): MeetupDTO {
  return {
    id: 0,
    title: '',
    description: '',
    image: null,
    imageId: null,
    date: new Date().setUTCHours(0, 0, 0, 0),
    dateIso: new Date().toISOString().split('T')[0],
    place: '',
    organizer: '',
    agenda: [],
  }
}

// Use negative IDs, so it won't conflict with real id
let lastId = -1

export function createAgendaItem(): MeetupAgendaItemDTO {
  return {
    id: lastId--,
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  }
}
