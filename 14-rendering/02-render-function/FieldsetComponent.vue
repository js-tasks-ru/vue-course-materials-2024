<script>
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'FieldsetComponent',
  render() {
    return h('fieldset', [h('legend', this.$slots.legend?.()), this.$slots.default?.()])
  },
})
</script>
