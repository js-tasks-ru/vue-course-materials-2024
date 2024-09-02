<script setup>
import UiListViewRemoveButton from './UiListViewRemoveButton.vue'
import UiListViewItem from './UiListViewItem.vue'

defineProps({
  item: {
    required: true,
  },
})

const emit = defineEmits(['remove'])
</script>

<template>
  <UiListViewItem>
    <span>{{ item }}</span>
    <UiListViewRemoveButton @click="emit('remove')" />
  </UiListViewItem>
</template>
