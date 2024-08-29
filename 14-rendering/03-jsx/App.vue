<script setup lang="tsx">
import { ref } from 'vue'
import CounterButton from './CounterButton.vue'
import FieldsetComponent from './FieldsetComponent.vue'
import TextDiv from './TextDiv.vue'

const count = ref(0)

const Root = () =>
  <FieldsetComponent>{{
    legend: () => 'Example',
    default: () => <>
      <TextDiv />
      <CounterButton v-model={[count.value, 'count']} />
    </>,
  }}</FieldsetComponent>
</script>

<template>
  <Root />
</template>
