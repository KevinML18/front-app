import { ref, watch } from 'vue'
import { useCookie } from '#app'

const authUser = ref(null)

export function useAuth() {
  const userCookie = useCookie('auth_user', { path: '/', maxAge: 60 * 60 * 24 * 7 })

  if (userCookie.value) {
    authUser.value = userCookie.value
  }

  watch(authUser, (newVal) => {
    userCookie.value = newVal
  }, { deep: true })

  function login(userData) {
    authUser.value = userData
  }

  function logout() {
    authUser.value = null
  }

  return { authUser, login, logout }
}
