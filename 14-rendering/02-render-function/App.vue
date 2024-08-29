<script setup>
import { ref } from 'vue'
import CounterButton from './CounterButton.vue'
import FieldsetComponent from './FieldsetComponent.vue'
import TextDiv from './TextDiv.vue'

const count = ref(0)
</script>

<template>
  <FieldsetComponent>
    <template #legend>Example</template>

    <TextDiv />
    <CounterButton v-model:count="count" />
  </FieldsetComponent>
</template>
