<script setup>
import UiListViewRemoveButton from './UiListViewRemoveButton.vue'
import MeetupsCard from './MeetupsCard.vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['remove'])
</script>

<template>
  <MeetupsCard :meetup="item">
    <template #extra>
      <UiListViewRemoveButton class="meetup-card-remove-button" @click="emit('remove')" />
    </template>
  </MeetupsCard>
</template>

<style scoped>
.meetup-card-remove-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
