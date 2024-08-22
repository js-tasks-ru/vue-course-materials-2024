<script setup>
import { computed, ref } from 'vue'
import UiInput from './UiInput.vue'

const props = defineProps({
  ...UiInput.props,
  modelValue: {
    type: Number,
    required: true,
  },
  type: undefined,
})
const emit = defineEmits(['update:modelValue'])
const slots = defineSlots()

const proxyModel = computed({
  get: () => props.modelValue.toString(),
  set: (value) => emit('update:modelValue', parseFloat(value)),
})

const propsToForward = computed(() => {
  const { modelValue, ...rest } = props
  return rest
})

const uiInputInstance = ref(null)

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
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>
