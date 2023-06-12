import { defineStore } from 'pinia'
// import { useRouter } from 'vue-router'
// import { useCookie } from '@nuxtjs/composition-api'

interface AuthState {
  loggedIn: boolean
  user: object
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    loggedIn: false,
    user: {},
  }),

  getters: {
    isLoggedIn: (state) => state.loggedIn,
    userData: (state) => state.user,
  },

  actions: {
    async login({ email, password, redirect }) {
      const router = useRouter()
      const { $directus } = useNuxtApp()
      const { setCookie } = useCookie()

      try {
        // Try to login
        const response = await $directus.auth.login({
          email,
          password,
        })

        // If login was successful, fetch the user's data
        const user = await $directus.users.me.read({
          fields: ['*'],
        })

        // Update the auth store with the user data
        this.loggedIn = true
        this.user = user

        // Set the authentication token cookie
        setCookie('authToken', response.data.token, {
          maxAge: 60 * 60 * 24 * 7, // Set the cookie to last for 7 days
          sameSite: 'bmc', // Adjust the SameSite attribute as needed
        })

        // If there's a redirect, send the user there
        if (redirect) {
          router.push(redirect)
        }
      } catch (e) {
        console.log(e)
        throw new Error('Wrong email address or password')
      }
    },

    // ... other actions ...

    async getUser() {
      const { $directus } = useNuxtApp()
      const { getCookie } = useCookie()

      try {
        // Try to fetch the user data
        const user = await $directus.users.me.read({
          fields: ['*'],
        })

        // Update the auth store with the user data
        this.loggedIn = true
        this.user = user

        // Get the authentication token from the cookie
        const authToken = getCookie('authToken')

        // Set the authentication token in the Directus SDK instance
        $directus.auth.setToken(authToken)
      } catch (e) {
        console.log(e)
      }
    },
  },
})
