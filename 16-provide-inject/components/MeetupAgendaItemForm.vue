<script setup>
import { UiIcon, UiInput, UiFormGroup } from '@shgk/vue-course-ui'

const props = defineProps({
  agendaItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['updateField', 'remove'])

function update(prop, value) {
  emit('updateField', {
    field: prop,
    value,
  })
}
</script>

<template>
  <div class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="emit('remove')">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup label="Тип">
      <select :value="agendaItem.type" @change="update('type', $event.target.value)" title="Тип">
        <option value="other">Другое</option>
      </select>
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput :model-value="agendaItem.startsAt" type="time" placeholder="00:00" @update:model-value="update('startsAt', $event)" />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput :model-value="agendaItem.endsAt" type="time" placeholder="00:00" @update:model-value="update('endsAt', $event)" />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup label="Заголовок">
      <UiInput :model-value="agendaItem.title" @update:model-value="update('title', $event)" />
    </UiFormGroup>

    <UiFormGroup label="Описание">
      <UiInput :model-value="agendaItem.description" multiline @update:model-value="update('description', $event)" />
    </UiFormGroup>
  </div>
</template>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
