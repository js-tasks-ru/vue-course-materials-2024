<script setup lang="ts">
import { computed, ref } from 'vue'
import UiInput from './UiInputTs.vue'
import type { UiInputProps, UiInputSlots } from './UiInputTs.vue'

export interface UiInputNumberProps extends Omit<UiInputProps, 'modelValue' | 'type'> {
  modelValue: number
  type?: 'number'
}

const props = defineProps<UiInputNumberProps>()
const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()
const slots = defineSlots<UiInputSlots>()

const proxyModel = computed({
  get: () => props.modelValue.toString(),
  set: (value) => emit('update:modelValue', parseFloat(value)),
})

const propsToForward = computed(() => {
  const { modelValue, type, ...rest } = props
  return rest
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
  <UiInput v-model="proxyModel" ref="uiInputInstance" v-bind="propsToForward" type="number">
    <template v-for="slotName in Object.keys(slots)" #[slotName]>
      <slot :name="slotName as keyof UiInputSlots" />
    </template>
  </UiInput>
</template>
