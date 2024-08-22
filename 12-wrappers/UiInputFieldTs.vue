<script setup lang="ts">
import { ref } from 'vue'
import UiInput from './UiInput.vue'
import type { UiInputSlots } from './UiInputTs.vue'

interface UiInputFieldSelfSlots {
  label?(): void
}

export interface UiInputFieldSlots extends UiInputSlots, UiInputFieldSelfSlots {}


defineOptions({
  inheritAttrs: false,
})

defineProps<{
  label?: string
}>()

const slots = defineSlots<UiInputFieldSlots>()

function getProxiedSlots() {
  const selfSlots = ['label']
  return Object.keys(slots).filter(slotName => !selfSlots.includes(slotName))
}

const uiInputInstance = ref<HTMLInputElement | null>(null)

function focus() {
  uiInputInstance.value?.focus()
}

defineExpose({
  focus,
})
</script>

<template>
  <div class="form-group">
    <label>
      <span v-if="label || slots.label" class="form-group__label">
        <slot name="label">{{ label }}</slot>
      </span>
      <UiInput v-bind="$attrs" ref="uiInputInstance">
        <template v-for="slotName in getProxiedSlots()" #[slotName]>
          <slot :name="slotName as keyof UiInputSlots" />
        </template>
      </UiInput>
    </label>
  </div>
</template>

<style scoped>
/* _form-group.css */
.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group.form-group--inline {
  display: inline-block;
  margin-bottom: 0;
}

.form-group.form-group--inline + .form-group.form-group--inline {
  margin-left: 16px;
}

.form-group__label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}
</style>
