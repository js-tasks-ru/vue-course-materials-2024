<script lang="jsx">
export default {
  name: 'CounterButton',

  props: {
    count: Number,
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    return () => <button onClick={() => emit('update:count', props.count + 1)}>{props.count}</button>
  },
}
</script>
