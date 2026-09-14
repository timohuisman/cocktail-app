export default defineNuxtRouteMiddleware((to) => {
  if (useRuntimeConfig().public.authDisabled) return

  const { loggedIn } = useUserSession()

  if (!loggedIn.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (loggedIn.value && to.path === '/login') {
    return navigateTo('/')
  }
})
