<template>
  <nav class="flex flex-wrap justify-center my-8">
    <NuxtLink
      v-for="item in categoryMap"
      :key="item"
      :to="`/${type}/${item.slug}`"
      exact-active-class="outline outline-1 outline-gray-600 dark:outline-neutral-700 "
      class="inline-flex text-sm text-gray-900 dark:text-neutral-200 bg-[#f2f2f2] dark:bg-[#1f2223] px-4 py-2 m-1 rounded-full">
      {{ item.name }}
    </NuxtLink>
  </nav>

  <h1 class="text-center text-2xl font-medium capitalize my-8 pb-8 border-b border-gray-200 dark:border-neutral-700">{{ selectedName }}</h1>
  <section class="my-8 grid gap-6 min-[450px]:grid-cols-2 md:grid-cols-3">
    <Post :posts="filteredPosts" />
  </section>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  posts: {
    type: Array,
    required: true,
  },
});

import { slugify } from "~/utils/slugify.js";
const { data: posts } = await useAsyncData("posts", () => queryContent("/blog").sort({ date: -1 }).find());

const categoryMap = computed(() => {
  const field = props.type === "tag" ? "tags" : "category";
  const categories = Array.from(new Set(posts.value.flatMap((post) => post[field])));

  return categories.map((category) => ({
    name: category,
    slug: slugify(category),
  }));
});

const route = useRoute();
const selectedItem = computed(() => route.params[props.type]);

const filteredPosts = computed(() => {
  return props.posts.filter((post) => {
    const field = props.type === "tag" ? "tags" : "category";
    return Array.isArray(post[field]) && post[field].map((tag) => slugify(tag)).includes(selectedItem.value);
  });
});

const selectedName = computed(() => {
  const selectedCategory = categoryMap.value.find((category) => category.slug === selectedItem.value);
  return selectedCategory ? selectedCategory.name : "";
});
</script>

<style scoped></style>
