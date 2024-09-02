<script setup>
import UiListViewRemoveButton from './UiListViewRemoveButton.vue'
import UiListViewItem from './UiListViewItem.vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['remove'])
</script>

<template>
  <UiListViewItem>
    <a :href="`/users/${item.id}`">{{ item.fullname }}</a>
    <UiListViewRemoveButton @click="emit('remove')" />
  </UiListViewItem>
</template>

<style scoped></style>
