const handlers = new Map()

// Экспорт для обычного <script>
export const selectOnFocus = {
  created() {},

  beforeMount() {},

  mounted(el, { value, modifiers, arg, dir, oldValue, instance }, vnode, oldVnode) {
    const handler = event => {
      const [start, end] = value ?? [0, -1]
      event.currentTarget.setSelectionRange(start, end)
    }
    handlers.set(el, handler)
    el.addEventListener('focus', handler)
  },

  beforeUpdate() {},

  updated() {},

  unmounted(el) {
    el.removeEventListener('focus', handlers.get(el))
    handlers.delete(el)
  },
}

// Экспорт для <script setup>
export const vSelectOnFocus = selectOnFocus
