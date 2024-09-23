<script setup>
import { ref } from 'vue'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  class: {
    type: [String, Object, Array],
  },
  inputClasses: {
    type: [String, Object, Array],
  },
})
const emit = defineEmits(['update:modelValue'])
const slots = defineSlots()
const model = defineModel()

const inputElement = ref(null)

function focus() {
  inputElement.value?.focus()
}

function hasLeftIcon() {
  return !!slots['left-icon']
}

defineExpose({
  focus,
})
</script>

<template>
  <div
      class="input-group"
      :class="[$props.class, {
      'input-group--icon': hasLeftIcon(),
      'input-group--icon-left': hasLeftIcon(),
    }]"
  >
    <div v-if="slots['left-icon']" class="input-group__icon">
      <slot name="left-icon" />
    </div>

    <input ref="inputElement"
           class="form-control"
           :class="[inputClasses, {
        'form-control--rounded': rounded,
      }]"
           v-bind="$attrs"
           v-model="model"
    />
  </div>
</template>

<style scoped>
/* _input-group.css */
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s border-color;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control--rounded {
  border-radius: 26px;
}

.form-control.form-control--sm.form-control--rounded {
  border-radius: 22px;
}

.form-control.form-control--sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group--icon-left .form-control {
  padding-left: 50px;
}

.input-group.input-group--icon-right .form-control {
  padding-right: 50px;
}

.input-group.input-group--icon .input-group__icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group--icon.input-group--icon-left .input-group__icon:first-child {
  left: 16px;
}

.input-group.input-group--icon.input-group--icon-right .input-group__icon:last-child {
  right: 16px;
}
</style>
