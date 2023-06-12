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
        <Listbox v-model="selectedRole" :options="roleOptions" required>
          <ListboxButton class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <span class="block truncate">{{ selectedRole ? selectedRole.name : 'Select a role' }}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>
          </ListboxButton>
          <ListboxOptions class="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60 sm:text-sm" v-slot="{ active }">
            <ListboxOption
              v-for="role in roleOptions"
              :key="role.id"
              :value="role"
              :class="{ 'text-white bg-blue-500': active === role }"
            >
              {{ role.name }}
            </ListboxOption>
          </ListboxOptions>
        </Listbox>
      </div>
      <input type="hidden" name="invite_url" :value="inviteUrl" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Send Invitation</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
const { SelectorIcon } = require('@heroicons/vue/24/solid') // Import the SelectorIcon from the Heroicons Vue package
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
