import { defineComponent, computed } from 'vue/dist/vue.esm-bundler.js'

const badgeClasses = {
  primary: 'badge--primary',
  success: 'badge--success',
}

export default defineComponent({
  name: 'UiBadge',

  props: {
    kind: {
      type: String,
      required: true,
      validator: (value) => Object.keys(badgeClasses).includes(value),
    },
  },

  setup(props) {
    const badgeClass = computed(() => badgeClasses[props.kind])

    return {
      badgeClass,
    }
  },

  template: `
    <span class="badge" :class="badgeClass"><slot /></span>
  `,
})
