<template>
  <FilterNav :items="categories" type="category" :posts="posts" />
</template>

<script setup>
const { data: posts } = await useAsyncData("posts", () => queryContent("/blog").sort({ date: -1 }).find());

const categories = Array.from(
  new Set(posts.value.flatMap((post) => post.category).filter((category) => category !== undefined && category.length > 0))
);
</script>

<style scoped></style>
