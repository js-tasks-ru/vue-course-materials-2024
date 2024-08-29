<script>
import { h } from 'vue'

export default {
  name: 'CounterButton',

  props: {
    count: Number,
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    return () => {
      return h('button', {
        onClick: () => emit('update:count', props.count + 1),
      }, props.count)
    }
  },
}
</script>
