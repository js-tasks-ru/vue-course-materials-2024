<script lang="ts">
import { computed } from 'vue'
import type { PropType, ComputedRef } from 'vue'

const buttonKindClasses = {
  primary: 'button--primary',
  secondary: 'button--secondary',
  danger: 'button--danger',
} as const

type ButtonKinds = keyof typeof buttonKindClasses

export default {
  props: {
    kind: {
      type: String as PropType<ButtonKinds>,
      validator: (value: ButtonKinds) => Object.keys(buttonKindClasses).includes(value),
      default: 'secondary',
    },
  },

  setup(props) {
    const kindClass: ComputedRef<string> = computed(() => buttonKindClasses[props.kind])

    return {
      kindClass,
    }
  },
}
</script>

<template>
  <button class="button" :class="kindClass">
    <slot/>
  </button>
</template>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button--block {
  display: block;
  width: 100%;
}

.button--primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button--primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}

.button--secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button--secondary:hover {
  border-color: var(--blue-light);
}

.button--danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button--danger:hover {
  border-color: var(--red-light);
}
</style>
