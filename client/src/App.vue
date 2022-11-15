<script setup>
import NavigationBar from "./components/core/NavBar.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
// const router = useRouter();
const route = useRoute();
let currentRoute = computed(() => {
  return route.name;
});
// const routePage = (pageName) => {
//   router.push(pageName);
// };
</script>

<template>
  <div id="global" class="flex flex-col bg-white text-black min-h-screen">
    <NavigationBar
      v-if="currentRoute != 'login'"
      class="bg-white-900 max-w-screen"
    />
    <RouterView class="bg-white-900 items-center min-h-screen text-black" />
  </div>
</template>

<style scoped></style>
