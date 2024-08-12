import {ref, watch} from 'vue'
import type { Ref } from 'vue'
import { throttle } from '../utils/throttle.ts'

export function useThrottledRef<T>(source: Ref<T>, delay: number) {
  const throttled: Ref<T> = ref(source.value) as Ref<T>

  const throttledSet = throttle((newValue: T) => {
    throttled.value = newValue
  }, delay)

  watch(source, (newValue) => {
    throttledSet(newValue)
  }, { immediate: true })

  return throttled
}
