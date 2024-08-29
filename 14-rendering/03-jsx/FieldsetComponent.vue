<script lang="jsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FieldsetComponent',

  render() {
    return <fieldset>
      <legend>{this.$slots.legend?.()}</legend>
      {this.$slots.default?.()}
    </fieldset>
  },
})
</script>
