<script setup>
import { toRef, provide } from 'vue'

const props = defineProps({
  selected: {
    type: String,
  },
})

const emit = defineEmits(['update:selected'])

function select(value) {
  emit('update:selected', value === props.selected ? '' : value)
}

const selected = toRef(() => props.selected)
const uiAccordionContext = { selected, select }

provide('UiAccordion:context', uiAccordionContext)
</script>

<template>
  <div class="accordion">
    <slot />
  </div>
</template>

<style scoped>
.accordion {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  overflow: hidden;
}
</style>
