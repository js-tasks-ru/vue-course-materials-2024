<script setup lang="ts">
import { ref } from 'vue'
import { UiContainer, UiButton, UiIcon } from '@shgk/vue-course-ui'
import UiInput from './UiInput.vue'
// import UiInputNumber from './UiInputNumber.vue'
// import UiInputField from './UiInputField.vue'

const value = ref('')
const numberValue = ref(0)
</script>

<template>
  <UiContainer>
    <p>
      <UiButton>Focus</UiButton>
    </p>

    <h2>UiInput</h2>
    <p>
      Value: "{{ value }}"
    </p>
    <UiInput />

<!--    <h2>UiInputNumber</h2>-->
<!--    <p>-->
<!--      Value: {{ numberValue }}-->
<!--    </p>-->
<!--    <UiInputNumber />-->

<!--    <h2>UiInputField</h2>-->
<!--    <p>-->
<!--      Value: {{ value }}-->
<!--    </p>-->
<!--    <UiInputField />-->

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
