<script setup>
import { ref, watchEffect } from 'vue'
import UiListViewRemoveButton from './UiListViewRemoveButton.vue'
import MeetupsCard from './MeetupsCard.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:items'])

const localItems = ref([])

watchEffect(() => {
  localItems.value = [...props.items]
})

function remove(index) {
  localItems.value.splice(index, 1)
  emit('update:items', [...localItems.value])
}
</script>

<template>
  <ul class="list-view">
    <li v-for="(item, index) in localItems" class="list-view__li">
      <MeetupsCard :meetup="item">
        <template #extra>
          <UiListViewRemoveButton class="meetup-card-remove-button" @click="remove(index)" />
        </template>
      </MeetupsCard>
    </li>
  </ul>
</template>

<style scoped>
.list-view__li {
  list-style: none;
  border-top: 1px solid var(--grey-3);
  &:first-child {
    border-top: none;
  }
}

.meetup-card-remove-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
