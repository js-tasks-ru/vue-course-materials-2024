<script setup>
import { ref, watch } from 'vue'
import { UiInput, UiButton, UiFormGroup } from '@shgk/vue-course-ui'
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue'
import { createAgendaItem } from '../services/meetups.service.ts'
import { klona } from 'klona'
import { dequal } from 'dequal'

const props = defineProps({
  meetup: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:meetup'])

const localMeetup = ref(klona(props.meetup))

watch(() => props.meetup, () => {
  if (dequal(props.meetup, localMeetup.value)) {
    return
  }
  localMeetup.value = klona(props.meetup)
}, { deep: true })

watch(localMeetup, () => {
  emit('update:meetup', klona(localMeetup.value))
}, { deep: true })

function addAgendaItem() {
  const newItem = createAgendaItem()
  localMeetup.value.agenda.push(newItem)
}

function removeAgendaItem(index) {
  localMeetup.value.agenda.splice(index, 1)
}
</script>

<template>
  <form class="meetup-form">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">
        <UiFormGroup label="Название">
          <UiInput v-model="localMeetup.title" />
        </UiFormGroup>
        <UiFormGroup label="Место проведения">
          <UiInput v-model="localMeetup.place" />
        </UiFormGroup>
      </fieldset>

      <h3 class="meetup-form__agenda-title">Программа</h3>
      <MeetupAgendaItemForm
        v-for="(agendaItem, index) in localMeetup.agenda"
        :key="agendaItem.id"
        v-model:agenda-item="localMeetup.agenda[index]"
        class="meetup-form__agenda-item"
        @remove="removeAgendaItem(index)"
      />

      <div class="meetup-form__append">
        <UiButton class="meetup-form__append-button" @click="addAgendaItem"> + Добавить пункт программы </UiButton>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <UiButton class="meetup-form__aside-button" wide>Cancel</UiButton>
        <UiButton class="meetup-form__aside-button" wide kind="primary" type="submit">Submit</UiButton>
      </div>
    </div>
  </form>
</template>

<style scoped>
.meetup-form__section {
  border: none;
}

.meetup-form__agenda-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  color: var(--body-color);
  margin: 0 0 24px 0;
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside-button {
  margin: 0 0 12px 0;
}

.meetup-form__agenda-item + .meetup-form__agenda-item {
  margin-top: 24px;
}

.meetup-form__append {
  margin-top: 24px;
}

.meetup-form__append-button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.meetup-form__append-button:hover {
  text-decoration: underline;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside-stick {
    position: sticky;
    top: 32px;
  }
}
</style>
