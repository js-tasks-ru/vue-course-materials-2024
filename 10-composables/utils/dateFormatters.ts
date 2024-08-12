export function formatAsLocalDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatAsIsoDate(timestamp: number) {
  return new Date(timestamp).toISOString().substring(0, 10)
}
