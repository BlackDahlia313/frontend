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
        <Listbox v-model="selectedRole">
          <div class="relative mt-1">
            <ListboxButton
              class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              <span class="block truncate">{{ selectedRole ? selectedRole.name : 'Select a role' }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="role in roleOptions"
                  :key="role.id"
                  :value="role"
                  as="template"
                >
                  <li
                    :class="[
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]"
                    >{{ role.name }}</span>
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <input type="hidden" name="invite_url" :value="inviteUrl" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Send Invitation</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

const { $directus } = useNuxtApp()

const email = ref('')
const selectedRole = ref(null)
const roleOptions = [
  { id: '0bd42dcf-4815-4be1-8319-113c3dd77eba', name: 'Architect' },
  { id: '46f6eb68-4724-48cc-bb00-0cc23f6d2950', name: 'Builder' },
  { id: 'b1615993-a5f6-4e71-9f9d-afae444b6c2c', name: 'Investor' },
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
