<script setup>
const emit = defineEmits(['input'])

const handleInput = (event) => {
  emit('input', event.target.value)
}
</script>

<template>
  <div>
    <input @input="handleInput" />
  </div>
</template>
