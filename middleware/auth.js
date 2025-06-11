import { useAuth } from '~/composables/auth/useAuth'

export default defineNuxtRouteMiddleware((to, from) => {
const { authUser } = useAuth()

  if (!authUser.value && to.path === '/account') {
    return navigateTo('/')
  }
})

