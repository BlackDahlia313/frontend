<template>
  <div class="max-w-md mx-auto mt-8">
    <h1 class="text-2xl font-bold mb-4">Register</h1>
    <form @submit.prevent="sendInvitation">
      <div class="mb-4">
        <label for="email" class="block mb-1">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div class="mb-4">
        <label for="role" class="block mb-1">Role</label>
        <Select v-model="selectedRole" :options="roleOptions" required />
      </div>
      <input type="hidden" name="invite_url" :value="inviteUrl" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Send Invitation</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Select } from '@headlessui/vue'
const { $directus } = useNuxtApp()

const email = ref('')
const selectedRole = ref(null)
const roleOptions = [
  { id: '0bd42dcf-4815-4be1-8319-113c3dd77eba', name: 'Architect' },
  { id: '46f6eb68-4724-48cc-bb00-0cc23f6d2950', name: 'Builder' },
  // Add more role options as needed
]

const inviteUrl = 'https://buildmy.city/accept-invite'

async function sendInvitation() {
  try {
    const selectedRoleId = selectedRole.value ? selectedRole.value.id : null
    await $directus.users.invites.send(email.value, selectedRoleId, inviteUrl)
    console.log('Invitation sent')
    // Optionally, you can redirect the user to a different page or show a success message.
  } catch (error) {
    console.error('Error sending invitation:', error)
    // Handle the error, e.g., show an error message to the user.
  }
}
</script>

<style scoped>
  /* Add custom styles for the Select component if needed */
</style>
