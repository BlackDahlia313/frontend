import { useAuth } from '~/store/auth'

const msg = 'You must be logged in to view this page. Redirecting back to the home page.'

export default function ({ store, redirect, from }) {
  const user = useAuth()

  // Check if the user is logged in
  if (!user.isLoggedIn) {
    // Check if the previous route is not the current route
    // This check is to avoid redirection when accessing the page directly via the URL
    if (from?.path !== null && from?.path !== '/') {
      // Redirect to the login page or any other appropriate page
      return navigateTo('/')
    }
  }
}
