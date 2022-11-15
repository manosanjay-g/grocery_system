<template>
  <div
    class="flex-row border-4 text-center mt-4 cursor-default lg:max-w-xs rounded-lg py-6 px-9 bg-slate-100 hover:scale-105 ease-in duration-300"
  >
    <img
      :src="props.url"
      class="w-40 h-40 justify-center mx-auto my-3 rounded-md"
    />
    <div>
      <h2 class="font-bold text-2xl">{{ props.name }}</h2>
      <p class="text-slate-600 font-semibold">{{ props.category }}</p>
      <p class="my-2 text-lg">{{ props.quantity }} Qts</p>
      <p class="my-2 text-lg bg-green-600 rounded-md text-white py-2">
        Rs.{{ props.price }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["name", "url", "quantity", "category", "price"]);
</script>
