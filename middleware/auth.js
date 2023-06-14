import { storeToRefs } from 'pinia'
// import { onMounted } from 'vue'
import { useAuth } from '~/store/auth'

const msg =
  'You must be logged in to view this page.'

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useAuth()
  // Get user data from the store
const { isLoggedIn } = storeToRefs(auth)

// // Fetch user data on component mount

//   auth.getUser()


  if (!user.isLoggedIn) {
    if (process.client) {
      window.alert(msg)
    }
    console.log(msg)

    return navigateTo('/')
  }
})
