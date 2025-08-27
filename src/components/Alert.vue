<template>
  <div v-if="message" class="fixed top-4 right-4 z-50">
    <div class="bg-red-500 text-white px-4 py-2 rounded shadow-lg">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: String,
});
</script>
