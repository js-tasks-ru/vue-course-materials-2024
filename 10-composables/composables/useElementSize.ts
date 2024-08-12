import { onMounted, onUnmounted, ref, toRef, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export function useElementSize(el: MaybeRefOrGetter<HTMLElement | null>) {
  const elRef = toRef(el)

  const width = ref(0)
  const height = ref(0)

  const observer = new ResizeObserver(updateSize)

  function updateSize() {
    const rect = elRef.value?.getBoundingClientRect()
    width.value = rect?.width || 0
    height.value = rect?.height || 0
  }

  onMounted(() => {
    if (elRef.value) {
      observer.observe(elRef.value)
    }
  })

  watch(elRef, (newEl, oldEl) => {
    if (oldEl) {
      observer?.unobserve(oldEl)
    }
    if (newEl) {
      observer?.observe(newEl)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    width,
    height,
  }
}
