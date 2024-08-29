<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count += 1">{{ count }}</button>
</template>
