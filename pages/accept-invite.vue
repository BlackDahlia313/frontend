<template>
    <div class="max-w-md mx-auto mt-8">
      <h1 class="text-2xl font-bold mb-4">Accept Invite</h1>
      <form @submit.prevent="acceptInvite">
        <div class="mb-4">
          <label for="token" class="block mb-1">Accept Token</label>
          <input v-model="token" type="text" id="token" required />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-1">Password</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block mb-1">Confirm Password</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" required />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Accept Invite</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  const { $directus } = useNuxtApp()
  
  const token = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  
  async function acceptInvite() {
    try {
      if (password.value !== confirmPassword.value) {
        console.error('Passwords do not match')
        // Handle the case where passwords do not match, e.g., show an error message to the user.
        return
      }
  
      await $directus.users.invites.accept(token.value, password.value)
      console.log('Invite accepted')
      // Optionally, you can redirect the user to a different page or show a success message.
    } catch (error) {
      console.error('Error accepting invite:', error)
      // Handle the error, e.g., show an error message to the user.
    }
  }
  </script>
  