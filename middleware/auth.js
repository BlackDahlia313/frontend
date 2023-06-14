import { useAuth } from '~/store/auth'
import { storeToRefs } from 'pinia'
const msg = 'You must be logged in to view this page.'

export default defineNuxtRouteMiddleware(({ redirect, from }) => {
  const auth = useAuth()
  
  const { isLoggedIn, user } = storeToRefs(auth)

  // Check if the middleware is called on the client-side
  if (process.client) {
    // Check if the previous route is not the current route
    // This check is to avoid alert and redirection when accessing the page directly via the URL
    if (from?.path !== null && from?.path !== '/') {
      if (!user.isLoggedIn) {
        window.alert(msg)
        // Redirect to the login page or any other appropriate page
        return navigateTo('/')
      }
    }
  }
})
