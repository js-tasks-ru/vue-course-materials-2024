export function throttle(func: Function, timeFrame: number) {
  let lastTime = 0
  return function (...args: unknown[]) {
    const now = +new Date()
    if (now - lastTime >= timeFrame) {
      func(...args)
      lastTime = now
    }
  }
}
