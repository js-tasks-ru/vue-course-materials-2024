<script setup>
import { inject } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  value: {
    type: String,
    required: true,
  },
})

const id = 'accordion-' + Math.random().toString(36).slice(2, 6)

const { selected, select } = inject('UiAccordion:context')
</script>

<template>
  <div class="accordion-item">
    <div
      :id="`${id}-button`"
      class="accordion-item__header"
      role="button"
      tabindex="0"
      :aria-expanded="value === selected ? 'true' : 'false'"
      :aria-controls="`${id}-section`"
      @click="select(value)"
    >
      {{ title }}
    </div>
    <div
      :id="`${id}-section`"
      v-show="value === selected"
      role="region"
      :aria-labelledby="`${id}-button`"
      :aria-hidden="value !== selected"
      class="accordion-item__content"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
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
