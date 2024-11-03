<template>
  <FilterNav :items="tags" type="tag" :posts="posts" />
</template>

<script setup>
const { data: posts } = await useAsyncData("posts", () => queryContent("/blog").sort({ date: -1 }).find());

const tags = Array.from(new Set(posts.value.flatMap((post) => post.tags).filter((tag) => tag !== undefined && tag.length > 0)));
</script>

<style scoped></style>
