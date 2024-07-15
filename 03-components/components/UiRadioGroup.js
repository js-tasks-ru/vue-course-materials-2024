import { defineComponent } from 'vue/dist/vue.esm-bundler.js'

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
      default: () => generateId(),
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

  template: `
    <div class="radio-group">
      <div v-for="option in options" :key="option.value" class="radio-group__button">
        <input
          :id="\`radio-group_\${name}_\${option.value}\`"
          class="radio-group__input"
          type="radio"
          :name
          :value="option.value"
          :checked="option.value === modelValue"
          @change="handleChange(option.value)"
        />
        <label :for="\`radio-group_\${name}_\${option.value}\`" class="radio-group__label">{{ option.label }}</label>
      </div>
    </div>
  `,
})
