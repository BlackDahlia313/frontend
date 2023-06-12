<template>
  <div class="relative max-w-4xl px-6 pt-12 pb-24 mx-auto space-y-8">
    <header
      class="relative overflow-hidden rounded-tr rounded-bl bg-gradient-to-br from-slate-900 to-slate-700 shadow-primary-600 rounded-tl-3xl rounded-br-3xl"
    >
      <!-- Header content -->
    </header>

    <div
      id="examples"
      class="relative flex-1 divide-y-2 divide-gray-200 dark:divide-gray-800"
    >
      <!-- Examples content -->
    </div>
    <div
      id="components"
      class="relative flex-1 divide-y-2 divide-gray-200 dark:divide-gray-800"
    >
      <!-- Components content -->
    </div>
    <footer
      class="relative rounded-tr rounded-bl md:flex md:justify-between bg-gray-50 dark:bg-gray-800 rounded-tl-3xl rounded-br-3xl"
    >
      <!-- Footer content -->
    </footer>
  </div>
</template>

<script setup>
const title = 'Directus & Nuxt 3 Starter'
useHead({
  title: title,
})
</script>

<script>
import { useAuth } from '~/store/auth'
import { getUser } from '~/composables/auth'

export default {
  async mounted() {
    const auth = useAuth()
    if (auth.isLoggedIn.value) {
      await getUser()
    }
  },
}
</script>
