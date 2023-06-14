import { useAuth } from '~/store/auth'

const msg = 'You must be logged in to view this page.'

export default function ({ store, redirect, from }) {
  const user = useAuth()

  // Check if the user is logged out
  if (!user.isLoggedIn) {
    // Check if the previous route is not the current route
    // This check is to avoid alert and redirection when accessing the page directly via the URL
    if (from?.path !== null && from?.path !== '/') {
      if (process.client) {
        window.alert(msg)
      }
      console.log(msg)
      return navigateTo('/')
    }
  }
}
