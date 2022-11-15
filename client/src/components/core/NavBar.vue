<template>
  <div
    id="navigation-bar"
    class="flex flex-row items-center justify-between text-center bg-green-600 text-white items-center px-4 py-4"
  >
    <div class="flex flex-row">
      <p class="text-2xl font-medium">Maneesh's</p>
    </div>
    <div id="nav-items " class="flex flex-row items-center">
      <input
        class="bg-slate-200 text-black w-96 mx-4 px-6 py-1 rounded-md"
        placeholder="Search"
        type="text"
        name=""
        @keyup="setSearchQuery"
        id=""
      />
      <router-link to="/"><p class="text-lg mx-2">Home</p></router-link>
      <router-link to="/groceries"
        ><p class="text-lg mx-2">Groceries</p></router-link
      >
      <router-link to="/users"><p class="text-lg mx-2">Users</p></router-link>
      <p class="text-lg mx-2 cursor-pointer" @click="logout">Log out</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";
import { useUserStore } from "../../stores/userStore";
import { onMounted } from "vue";
const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();
onMounted(() => {
  authStore.getUserInfo();
  authStore.getGroceries();
});
const logout = () => {
  authStore.logout();
};
const setSearchQuery = (event) => {
  userStore.setSearchQuery(event.target.value);
};
</script>
