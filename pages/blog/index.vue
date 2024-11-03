<template>
  <div v-if="!posts && !error" class="text-center">Ładowanie...</div>
  <div v-if="error" class="text-center text-red-500">Wystąpił błąd podczas ładowania artykułów.</div>

  <section class="my-8 grid gap-6 min-[450px]:grid-cols-2 md:grid-cols-3">
    <Post :posts="posts" />
  </section>
</template>

<script setup>
const { data: posts, error } = await useAsyncData("posts", () => {
  return queryContent("/blog").sort({ date: -1 }).find();
});
</script>

<style scoped></style>
