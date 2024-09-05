import { createAgendaItem, createMeetup } from '../services/meetups.service.ts'
import { inject, provide, ref } from 'vue'
import type { MeetupDTO, MeetupAgendaItemDTO } from '../types/meetups.types.ts'
import type { Ref, InjectionKey } from 'vue'

const MeetupFormContextKey = Symbol('MeetupForm') as InjectionKey<ReturnType<typeof useMeetupFormProvider>>

export function useMeetupFormProvider() {
  const meetup: Ref<MeetupDTO> = ref(createMeetup())

  function setMeetup(newMeetup: MeetupDTO) {
    meetup.value = newMeetup
  }

  function updateMeetupField<T extends keyof MeetupDTO, K extends MeetupDTO[T]>(field: T, value: K) {
    meetup.value[field] = value
  }

  function addAgendaItem() {
    meetup.value.agenda.push(createAgendaItem())
  }

  function removeAgendaItem(index: number) {
    meetup.value.agenda.splice(index, 1)
  }

  function updateAgendaItemField<T extends keyof MeetupAgendaItemDTO, K extends MeetupAgendaItemDTO[T]>(
    index: number,
    field: T,
    value: K,
  ) {
    meetup.value.agenda[index][field] = value
  }

  const context = {
    meetup,
    setMeetup,
    updateMeetupField,
    addAgendaItem,
    removeAgendaItem,
    updateAgendaItemField,
  }

  provide(MeetupFormContextKey, context)

  return context
}

export function useMeetupFormContext() {
  return inject(MeetupFormContextKey)
}
