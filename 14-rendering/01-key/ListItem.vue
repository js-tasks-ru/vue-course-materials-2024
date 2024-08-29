<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const { item } = toRefs(props)
const value = ref(item.value)
</script>

<template>
  <div>{{ value }}</div>
</template>
