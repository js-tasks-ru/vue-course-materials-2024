<script setup>
import { ref, toRef, watchEffect } from 'vue'
import ItemDefault from './ItemDefault.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },

  itemComponent: {
    type: Object,
    default: ItemDefault,
  },
})

const emit = defineEmits(['update:items'])

const ItemComponent = toRef(() => props.itemComponent)

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
      <ItemComponent :item="item" @remove="remove(index)" />
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
</style>
