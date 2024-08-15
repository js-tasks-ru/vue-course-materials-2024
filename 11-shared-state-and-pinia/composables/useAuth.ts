import { computed, readonly, ref } from 'vue'
import type { UserDTO } from '../types/meetups.types.ts'

const user = ref<UserDTO | null>(null)

const isAuthenticated = computed(() => user.value !== null)

function setUser(newUser: UserDTO | null) {
  user.value = newUser
}

export function useAuth() {
  return {
    user: readonly(user),
    setUser,
    isAuthenticated,
  }
}
