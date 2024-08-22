<script setup lang="ts">
import { computed, ref } from 'vue'
import UiInput from './UiInputTs.vue'
import type { UiInputSlots } from './UiInputTs.vue'

const props = defineProps<{
  modelValue: number
}>()
const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()
const slots = defineSlots<UiInputSlots>()

const proxyModel = computed({
  get: () => props.modelValue.toString(),
  set: (value) => emit('update:modelValue', parseFloat(value)),
})

const uiInputInstance = ref<HTMLInputElement | null>(null)

function focus() {
  uiInputInstance.value?.focus()
}

defineExpose({
  focus,
})
</script>

<template>
  <UiInput v-model="proxyModel" ref="uiInputInstance" type="number">
    <template v-for="slotName in Object.keys(slots)" #[slotName]>
      <slot :name="slotName as keyof UiInputSlots" />
    </template>
  </UiInput>
</template>
