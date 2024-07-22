import { defineComponent, computed } from 'vue/dist/vue.esm-bundler.js'
import './UiButton.css'

const buttonKindClasses = {
  primary: 'button--primary',
  secondary: 'button--secondary',
  danger: 'button--danger',
}

export default defineComponent({
  name: 'UiButton',

  props: {
    kind: {
      type: String,
      validator: (value) => Object.keys(buttonKindClasses).includes(value),
      default: 'secondary',
    },
  },

  setup(props) {
    const kindClass = computed(() => buttonKindClasses[props.kind])
    return {
      kindClass,
    }
  },

  template: `
    <button class="button" :class="kindClass">
      <slot></slot>
    </button>
  `,
})
