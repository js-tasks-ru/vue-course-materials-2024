<script setup>
import { h, ref } from 'vue'
import CounterButton from './CounterButton.vue'
import FieldsetComponent from './FieldsetComponent.vue'
import TextDiv from './TextDiv.vue'

const count = ref(0)

const Root = () =>
  h(FieldsetComponent, null, {
    legend: () => 'Example',
    default: () => [
      h(TextDiv),
      h(CounterButton, {
        'onUpdate:count': value => (count.value = value),
        count: count.value,
      }),
    ],
  })
</script>

<template>
  <Root />
</template>
