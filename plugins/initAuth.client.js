export default defineNuxtPlugin(() => {
  const userCookie = useCookie('auth_user')
  const authUser = getAuthUser()

  if (userCookie.value) {
    authUser.value = userCookie.value
  }
})