<script>
import { defineComponent } from 'vue'

const generateId = () => Math.random().toString(36).slice(2, 9)

export default defineComponent({
  name: 'UiRadioGroup',

  props: {
    modelValue: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      default: () => `ui-radio-group-${generateId()}`,
    },
  },

  setup(props, { emit }) {
    function handleChange(value) {
      emit('update:modelValue', value)
    }

    return {
      handleChange,
    }
  },
})
</script>

<template>
  <div class="radio-group">
    <div v-for="option in options" :key="option.value" class="radio-group__button">
      <input
        :id="`radio-group_${name}_${option.value}`"
        class="radio-group__input"
        type="radio"
        :name
        :value="option.value"
        :checked="option.value === modelValue"
        @change="handleChange(option.value)"
      />
      <label :for="`radio-group_${name}_${option.value}`" class="radio-group__label">{{ option.label }}</label>
    </div>
  </div>
</template>

<style scoped>
.radio-group {
  display: flex;
  flex-direction: row;
}

.radio-group__button {
  position: relative;
  display: inline-flex;
}

.radio-group__label {
  margin-right: 16px;
  height: 44px;
  padding: 6px 16px;
  border-radius: 22px;
  border: 2px solid transparent;
  color: var(--blue);
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  transition: 0.2s border-color;
}

.radio-group__label:hover,
.radio-group__input:checked ~ .radio-group__label {
  border-color: var(--blue);
}

.radio-group__input {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

@media all and (max-width: 767px) {
  .radio-group__label {
    margin-right: 8px;
    padding: 6px 8px;
  }
}
</style>
