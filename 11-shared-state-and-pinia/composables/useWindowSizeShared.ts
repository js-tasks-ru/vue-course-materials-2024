import { createSharedComposable } from '@vueuse/core'
import { onUnmounted, ref } from 'vue'

export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const updateWindowSize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  window.addEventListener('resize', updateWindowSize, { passive: true })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize)
  })

  return {
    width,
    height,
  }
}

export const useWindowSizeShared = createSharedComposable(useWindowSize)
