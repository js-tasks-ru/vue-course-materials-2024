<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },

  selected: {
    type: String,
  },
})

const emit = defineEmits(['update:selected'])

const id = 'accordion-' + Math.random().toString(36).slice(2, 6)

function select(value) {
  emit('update:selected', value === props.selected ? '' : value)
}
</script>

<template>
  <div class="accordion">
    <div v-for="(option, index) in options" :key="option.value" class="accordion-item">
      <div
        :id="`${id}-button-${index}`"
        class="accordion-item__header"
        role="button"
        tabindex="0"
        :aria-expanded="option.value === selected ? 'true' : 'false'"
        :aria-controls="`${id}-section-${index}`"
        @click="select(option.value)"
      >
        {{ option.title }}
      </div>
      <div
        :id="`${id}-section-${index}`"
        v-show="option.value === selected"
        role="region"
        :aria-labelledby="`${id}-button-${index}`"
        :aria-hidden="option.value !== selected"
        class="accordion-item__content"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  overflow: hidden;
}

.accordion-item {
  border-top: 2px solid var(--blue-light);
}

.accordion-item:first-child {
  border-top: none;
}

.accordion-item__header {
  background: var(--blue-extra);
  cursor: pointer;
  padding: 5px;
}

.accordion-item__content {
  padding: 5px;
}
</style>
