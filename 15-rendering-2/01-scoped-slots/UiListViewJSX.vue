<script lang="jsx">
import { ref, watchEffect } from 'vue'
import UiListViewItem from './UiListViewItem.vue'
import UiListViewRemoveButton from './UiListViewRemoveButton.vue'

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },

    renderItem: {
      type: Function,
      default: ({ item, remove }) => (
        <UiListViewItem>
          <span>{item}</span>
          <UiListViewRemoveButton onClick={() => remove()} />
        </UiListViewItem>
      ),
    },
  },

  emits: ['update:items'],

  setup(props, { emit }) {
    const localItems = ref([])

    watchEffect(() => {
      localItems.value = [...props.items]
    })

    function remove(index) {
      localItems.value.splice(index, 1)
      emit('update:items', [...localItems.value])
    }

    return {
      localItems,
      remove,
    }
  },

  render() {
    return (
      <ul class="list-view">
        {this.localItems.map((item, index) => (
          <li key={index} class="list-view__li">
            {this.renderItem({ item, remove: () => this.remove(index) })}
          </li>
        ))}
      </ul>
    )
  },
}
</script>

<style scoped>
.list-view__li {
  list-style: none;
  border-top: 1px solid var(--grey-3);
  &:first-child {
    border-top: none;
  }
}
</style>
