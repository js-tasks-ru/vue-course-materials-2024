<script setup lang="ts" generic="T extends unknown">
import { ref, watchEffect } from 'vue'
import type { Ref, VNode } from 'vue'
import UiListViewItem from './UiListViewItem.vue'
import UiListViewRemoveButton from './UiListViewRemoveButton.vue'

const props = defineProps<{
  items: T[],
}>()

const emit = defineEmits(['update:items'])

defineSlots<{
  default({ item, remove }: { item: T, remove: () => void }): VNode[]
}>()

const localItems: Ref<T[]> = ref([])

watchEffect(() => {
  localItems.value = [...props.items]
})

function remove(index: number) {
  localItems.value.splice(index, 1)
  emit('update:items', [...localItems.value])
}
</script>

<template>
  <ul class="list-view">
    <li v-for="(item, index) in localItems" class="list-view__li">
      <slot :item="item" :remove="() => remove(index)">
        <UiListViewItem>
          <span>{{ item }}</span>
          <UiListViewRemoveButton @click="remove(index)" />
        </UiListViewItem>
      </slot>
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
