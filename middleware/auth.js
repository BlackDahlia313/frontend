import { useAuth } from '~/store/auth'

const msg = 'You must be logged in to view this page. Redirecting back to the home page.'

export default function ({ redirect }) {
  return {
    async beforeRouteEnter(to, from) {
      const user = useAuth()

      if (!user.isLoggedIn) {
        if (from?.path !== null && from?.path !== '/') {
          if (window.confirm(msg)) {
            redirect('/')
          } else {
            redirect(from.path)
          }
        }
      }
    },
    setup() {
      const user = useAuth()

      onMounted(() => {
        if (!user.isLoggedIn) {
          if (window.confirm(msg)) {
            redirect('/')
          }
        }
      })
    }
  }
}
