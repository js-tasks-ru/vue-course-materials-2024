<script setup lang="ts">
import { ref } from 'vue'
import { UiContainer, UiButton, UiIcon } from '@shgk/vue-course-ui'
import UiInput from './UiInput.vue'
import UiInputNumber from './UiInputNumberTs2.vue'
import UiInputField from './UiInputField.vue'

const value = ref('')
const numberValue = ref(0)

const uiInputInstance = ref<InstanceType<typeof UiInput> | null>(null)

function focusInput() {
  uiInputInstance.value?.focus()
}
</script>

<template>
  <UiContainer>
    <p>
      <UiButton @click="focusInput">Focus</UiButton>
    </p>

    <h2>UiInput</h2>
    <p>
      Value: "{{ value }}"
    </p>
    <UiInput v-model="value" ref="uiInputInstance" rounded placeholder="Search" type="search">
      <template #left-icon>
        <UiIcon icon="search" />
      </template>
    </UiInput>

    <h2>UiInputNumber</h2>
    <p>
      Value: {{ numberValue }}
    </p>
    <UiInputNumber v-model="numberValue" rounded placeholder="Days">
      <template #left-icon>
        <UiIcon icon="search" />
      </template>
    </UiInputNumber>

    <h2>UiInputField</h2>
    <p>
      Value: {{ value }}
    </p>
    <UiInputField v-model="value" rounded placeholder="Search" label="Search">
      <template #left-icon>
        <UiIcon icon="search" />
      </template>
    </UiInputField>

  </UiContainer>
</template>

<style scoped>
h2 {
  margin: 2rem 0 1rem 0;
}

p {
  margin: 1rem 0;
}
</style>
