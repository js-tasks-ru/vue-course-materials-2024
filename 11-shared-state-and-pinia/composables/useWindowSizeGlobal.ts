import { ref } from 'vue'

const width = ref(window.innerWidth)
const height = ref(window.innerHeight)

const updateWindowSize = () => {
  width.value = window.innerWidth
  height.value = window.innerHeight
}

window.addEventListener('resize', updateWindowSize, { passive: true })

export function useWindowSizeGlobal() {
  return {
    width,
    height,
  }
}
