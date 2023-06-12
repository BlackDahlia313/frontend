<template>
  <ClientOnly fallback-tag="span" fallback="Loading page...">
    <div v-if="page.status === 'Published'" class="max-w-3xl px-6 py-12 mx-auto space-y-8">
      <!-- Content of the page -->
    </div>
    <div v-else>
      Redirecting...
    </div>
  </ClientOnly>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import MarkdownIt from 'markdown-it'
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()
const { params, router } = useRoute()

const page = ref({
  status: '',
  contentHtml: '',
})

onMounted(async () => {
  const { data, error } = await $directus
    .items('pages')
    .readByQuery({ filter: { slug: params.slug }, limit: 1 })

  if (error) {
    // Handle the error, e.g., show an error message
    console.error(error)
  } else {
    if (data && data.length > 0) {
      const pageData = data[0]
      page.value.status = pageData.status

      if (pageData.status === 'Published') {
        page.value.title = pageData.title
        page.value.contentHtml = pageData.content
        
        if (pageData.image) {
          page.value.image = pageData.image
        }
        
        const md = new MarkdownIt()
        page.value.contentHtml = md.render(page.value.contentHtml)
      } else {
        // Redirect to the home page
        router.push('/')
      }
    } else {
      // Handle the case where the data is empty or not found
      console.error('Page data not found')
    }
  }
})

useHead(() => ({
  title: page.value.title || '',
}))
</script>
