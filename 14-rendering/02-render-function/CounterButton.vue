<script>
export default {
  name: 'CounterButton',

  props: {
    count: Number,
  },

  emits: ['update:count'],
}
</script>

<template>
  <button @click="$emit('update:count', count + 1)">{{ count }}</button>
</template>
