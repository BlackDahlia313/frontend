import { useAuth } from '~/store/auth'

const msg = 'You must be logged in to view this page. Redirecting back to the home page.'

export default defineNuxtRouteMiddleware(({ redirect }) => {
  const user = useAuth()

  onMounted(() => {
    if (!user.isLoggedIn) {
      if (process.client) {
        window.alert(msg)
      }
      console.log(msg)
      navigateTo('/')
    }
  })
})
