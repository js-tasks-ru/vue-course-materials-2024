<script setup>
import { ref, toRefs, watch } from 'vue'

const props = defineProps({
  item: {
    type: Object,
  },
})

const { item } = toRefs(props)

const value = ref(undefined)

const updateValue = () => {
  const timeout = Math.round(Math.random() * 1000)
  setTimeout(() => {
    value.value = props.item.value
  }, timeout)
}

watch(item, updateValue, { immediate: true, deep: true },)
</script>

<template>
  <div>{{ value }}</div>
</template>
