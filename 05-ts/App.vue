<script setup>
import UiContainer from './components/UiContainer.vue'
import UiButton from './components/UiButton.vue'
import UiButtonGroup from './components/UiButtonGroup.vue'
import UiRadioGroup from './components/UiRadioGroup.vue'
import { ref } from 'vue'

const view = ref('list')
const selected = ref('1')
</script>

<template>
  <div class="wrapper">
    <div class="main">
      <UiContainer>
        <h2>Button</h2>
        <p>
          <UiButton>UiButton</UiButton>
        </p>

        <h2>UiButtonGroup</h2>
        <p>
          <UiButtonGroup v-model:view="view" />
        </p>

        <h2>UiRadioGroup</h2>
        <p>
          <UiRadioGroup v-model="selected" :options="[{ label: 'One', value: '1' }, { label: 'Two', value: '2' }]" />
        </p>
      </UiContainer>
    </div>
  </div>
</template>

<style scoped>
p {
  margin: 10px;
}
</style>
