<template>
    <div class="max-w-md mx-auto mt-8">
      <h1 class="text-2xl font-bold mb-4">Register</h1>
      <form @submit.prevent="sendInvitation">
        <div class="mb-4">
          <label for="email" class="block mb-1">Email</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Send Invitation</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
      }
    },
    methods: {
      async sendInvitation() {
        try {
          const { data } = await this.$directus.invites.create({
            email: this.email,
            role: '0bd42dcf-4815-4be1-8319-113c3dd77eba',
          })
          console.log('Invitation sent:', data)
          // Optionally, you can redirect the user to a different page or show a success message.
        } catch (error) {
          console.error('Error sending invitation:', error)
          // Handle the error, e.g., show an error message to the user.
        }
      },
    },
  }
  </script>
  