<script setup>
import GroceryItemVue from "../components/GroceryItem.vue";
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
const authStore = useAuthStore();
const userStore = useUserStore();
let filteredGroceries = computed(() => {
  if (userStore.searchQuery) {
    return authStore.groceriesData.filter((grocery) => {
      return grocery.name
        .toLowerCase()
        .includes(userStore.searchQuery.toLowerCase());
    });
  } else {
    return authStore.groceriesData;
  }
});
</script>

<template>
  <div class="grid grid-cols-6 gap-2 place-items-start p-6 grocery-items">
    <GroceryItemVue
      v-for="grocery in filteredGroceries"
      :category="grocery.category"
      :name="grocery.name"
      :url="grocery.img_url"
      :quantity="grocery.quantity"
      :price="grocery.price"
    />
  </div>
</template>

<style>
.grocery-items {
  align-items: flex-start !important;
}
</style>
