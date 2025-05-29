import { ref, watch } from 'vue'
import { useCookie } from '#app'

const authUser = ref(null)

export function useAuth() {
  const userCookie = useCookie('auth_user')

  if (userCookie.value) {
    authUser.value = userCookie.value
  }

  watch(authUser, (newVal) => {
    userCookie.value = newVal
  })

  function login(userData) {
    authUser.value = userData
  }

  function logout() {
    authUser.value = null
  }

  return { authUser, login, logout }
}
