<script setup>
import CounterButton from './CounterButton.vue'

const props = defineProps({
  name: String,
})
</script>

<template>
  <div>
    Button {{ name }}: <CounterButton />
  </div>
</template>
