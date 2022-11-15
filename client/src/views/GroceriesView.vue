<template>
  <div class="flex flex-col items-start">
    <button
      @click="showModal = !showModal"
      class="px-4 py-2 bg-green-600 text-white rounded-lg mx-6 mt-8"
    >
      Add Grocery
    </button>

    <form
      method="post"
      @submit.prevent="addGrocery"
      v-if="showModal == true"
      class="flex flex-col justify-center my-4"
    >
      <div class="my-3">
        <input
          type="text"
          id=""
          v-model="grocery.img_url"
          class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Grocery Image URL"
          required
        />
      </div>
      <div class="my-3">
        <input
          type="text"
          id=""
          v-model="grocery.name"
          class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Grocery Name"
          required
        />
      </div>
      <div class="my-3">
        <input
          type="text"
          id=""
          v-model="grocery.quantity"
          class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Quantity"
          required
        />
      </div>
      <div class="my-3">
        <input
          type="text"
          id=""
          v-model="grocery.category"
          class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Category"
          required
        />
      </div>
      <div class="my-3">
        <input
          type="text"
          id=""
          class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Price"
          v-model="grocery.price"
          required
        />
      </div>

      <button
        type="submit"
        class="my-3 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Add
      </button>
    </form>
    <form
      method="post"
      @submit.prevent="editGrocery"
      v-if="showEditModal == true"
      class="flex flex-col justify-center my-4"
    >
      <div class="my-3">
        <input
          type="text"
          id=""
          v-model="grocery.img_url"
          class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Grocery Image URL"
          required
        />
      </div>
      <div class="my-3">
        <input
          type="text"
          id=""
          v-model="grocery.name"
          class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Grocery Name"
          required
        />
      </div>
      <div class="my-3">
        <input
          type="text"
          id=""
          v-model="grocery.quantity"
          class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Quantity"
          required
        />
      </div>
      <div class="my-3">
        <input
          type="text"
          id=""
          v-model="grocery.category"
          class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Category"
          required
        />
      </div>
      <div class="my-3">
        <input
          type="text"
          id=""
          class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Price"
          v-model="grocery.price"
          required
        />
      </div>

      <button
        type="submit"
        class="my-3 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Edit
      </button>
    </form>

    <div
      class="text-center my-4"
      v-if="authStore.groceriesData.length == 0 && showModal == false"
    >
      No items are in the list
    </div>
    <div
      class="overflow-x-auto shadow-md sm:rounded-lg mx-6 my-4"
      v-else-if="authStore.groceriesData.length != 0 && showModal == false"
    >
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs uppercase bg-green-600 text-white">
          <tr>
            <th scope="col" class="py-3 px-6">Name</th>
            <th scope="col" class="py-3 px-6">Quantity</th>
            <th scope="col" class="py-3 px-6">Category</th>
            <th scope="col" class="py-3 px-6">Price</th>
            <th scope="col" class="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-gray-100 border-gray-700 hover:bg-gray-200"
            v-for="grocery in authStore.groceriesData"
          >
            <td class="py-4 px-6">{{ grocery.name }}</td>
            <td class="py-4 px-6">{{ grocery.quantity }}</td>
            <td class="py-4 px-6">
              {{ grocery.category }}
            </td>
            <td class="py-4 px-6">Rs.{{ grocery.price }}</td>
            <td class="py-4 px-6 flex flex-row">
              <p
                @click="showEditModalGrocery(grocery)"
                class="font-medium text-blue-500 mx-1 cursor-pointer hover:underline"
              >
                Edit Grocery
              </p>
              |
              <p
                @click="deleteGrocery(grocery._id)"
                class="font-medium text-blue-500 mx-1 cursor-pointer hover:underline"
              >
                Delete Grocery
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
const authStore = useAuthStore();
const showModal = ref(false);
const showEditModal = ref(false);
const grocery = ref({
  img_url: "",
  name: "",
  quantity: "",
  category: "",
  price: "",
});
const addGrocery = () => {
  userStore.addGrocery(grocery.value);
};
const editGrocery = () => {
  userStore.editGrocery(grocery.value);
};
const deleteGrocery = (id) => {
  userStore.deleteGrocery(id);
};
const showEditModalGrocery = (groceryInfo) => {
  grocery.value = groceryInfo;
  showEditModal.value = true;
};
onMounted(() => {
  authStore.getGroceries();
});
</script>
