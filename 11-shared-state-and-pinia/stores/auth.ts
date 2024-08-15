import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { UserDTO } from '../types/meetups.types.ts'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserDTO | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  function setUser(newUser: UserDTO | null) {
    user.value = newUser
  }

  return {
    user,
    setUser,
    isAuthenticated,
  }
})

// Or in options

export const useAuthStoreOptions = defineStore('auth', {
  state() {
    return {
      user: null as UserDTO | null,
    }
  },

  getters: {
    isAuthenticated: state => state.user !== null,

    isAuthenticated2(): boolean {
      return this.user !== null
    },
  },

  actions: {
    setUser(newUser: UserDTO | null) {
      this.user = newUser
    },
  },
})
