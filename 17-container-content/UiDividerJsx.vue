<script lang="jsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UiDividerJsx',

  setup(_, { slots }) {
    return () => {
      const content = slots.default?.()
      return (
        <div class="divider-container">
          {content.map((item, index) => (
            <>
              {index !== 0 && <hr class="divider" />}
              {item}
            </>
          ))}
        </div>
      )
    }
  },
})
</script>

<style scoped>
.divider {
  border-top: 1px solid var(--grey-3);
  margin: 10px 0;
}
</style>
