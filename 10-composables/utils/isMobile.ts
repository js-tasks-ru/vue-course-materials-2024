function checkIsMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export const isMobile = checkIsMobile()
