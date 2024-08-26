import {
  ref,
  reactive,
  shallowRef,
  shallowReactive,
  computed,
  watch,
  customRef,
  effectScope,
  ReactiveEffect,
  onScopeDispose,
} from 'vue'

class Counter {
  #count = 0

  get count() {
    return this.#count
  }

  increment() {
    this.#count++
  }
}

const originalState = {
  items: ['a', 'b', 'c'],
  user: 'Alice',
  date: new Date(),
  counter: new Counter(),
}
window.originalState = originalState

const state = reactive(originalState)
window.state = state

const currentItemIndex = ref(0)
window.currentItemIndex = currentItemIndex

const currentItem = computed(() => state.items[currentItemIndex.value])
window.currentItem = currentItem

const foo = ref(0)
const bar = ref(foo)
const fooAndBar = reactive({ foo, bar })
window.foo = foo
window.bar = bar
window.fooAndBar = fooAndBar

function useDebouncedRef(source, delay = 200) {
  let timeout
  const debounced = shallowRef(source.value)

  const update = newValue => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debounced.value = newValue
    }, delay)
  }

  watch(source, newValue => update(newValue), { immediate: true })

  return debounced
}


function createdDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}

function createSharedComposable(composable) {
  let subscribers = 0
  let state, scope

  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop()
      state = scope = null
    }
  }

  return (...args) => {
    subscribers++
    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }
    onScopeDispose(dispose)
    return state
  }
}

/***************
 * Планировщик *
 ***************/

const a = ref(0)
const b = ref(0)

const sum = computed(() => {
  console.log('[computed] sum')
  return a.value + b.value
})
watch(a, () => console.log('[watch (pre)] a'), { flush: 'pre' })
watch(a, () => console.log('[watch (sync)] a'), { flush: 'sync' })
watch(a, () => console.log('[watch (post)] a'), { flush: 'post' })
watch(b, () => console.log('[watch (pre)] b'))
watch(sum, () => {
  console.log('[watch (pre)] sum')
})

setTimeout(() => {
  Promise.resolve().then(() => {
    console.log('Resolved Promise')
  })
  console.log('Start updating A and B')
  a.value += 1
  b.value += 1
  console.log('Finish updating A and B')
})
