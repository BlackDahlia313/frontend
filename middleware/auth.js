import { useAuth } from '~/store/auth'
import { onMounted } from 'vue'

const msg = 'You must be logged in to view this page.'

export default defineNuxtRouteMiddleware(() => {
  const user = useAuth()

  onMounted(() => {
    if (!user.isLoggedIn) {
      if (process.client) {
        window.alert(msg)
      }
      console.log(msg)
      return navigateTo('/')
    }
  })
})
