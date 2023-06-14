import { useAuth } from '~/store/auth'
const msg =
  'You must be logged in to view this page. Redirecting back to home page.'

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useAuth()

  user.watch((state) => {
    if (!state.isLoggedIn) {
      if (process.client) {
        window.alert(msg)
      }
      console.log(msg)

      return navigateTo('/')
    }
  })
})