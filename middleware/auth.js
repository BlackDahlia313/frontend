import { useAuth } from '~/store/auth'

const msg = 'You must be logged in to view this page.'

export default defineNuxtRouteMiddleware(({ redirect }) => {
  const user = useAuth()

  if (!user.isLoggedIn) {
    if (process.client) {
      window.alert(msg)
    }
    console.log(msg)
    return navigateTo('/')
  }
})