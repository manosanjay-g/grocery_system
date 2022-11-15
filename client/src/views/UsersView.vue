<template>
  <div class="flex flex-col items-start">
    <button class="px-4 py-2 bg-green-600 text-white rounded-lg mx-6 mt-8">
      Add User
    </button>
    <div class="overflow-x-auto shadow-md sm:rounded-lg mx-6 my-4">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs uppercase bg-green-600 text-white">
          <tr>
            <th scope="col" class="py-3 px-6">Name</th>
            <th scope="col" class="py-3 px-6">Email</th>
            <th scope="col" class="py-3 px-6">Password</th>
            <th scope="col" class="py-3 px-6">Role</th>
            <th scope="col" class="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-gray-100 border-gray-700 hover:bg-gray-200"
            v-for="user in adminStore.usersData"
          >
            <td class="py-4 px-6">{{ user.name }}</td>
            <td class="py-4 px-6">{{ user.email }}</td>
            <td class="py-4 px-6">
              {{ user.password }}
            </td>
            <td class="py-4 px-6">
              {{ user.role }}
            </td>

            <td class="py-4 px-6">
              <a
                href="#"
                class="font-medium text-blue-600 text-blue-500 hover:underline"
                >Edit user</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAdminStore } from "../stores/adminStore";

const adminStore = useAdminStore();
onMounted(() => {
  adminStore.getUsersInfo();
});
</script>
