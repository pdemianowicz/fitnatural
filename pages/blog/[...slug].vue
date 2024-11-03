<template>
  <ContentRenderer
    :value="data"
    class="prose dark:prose-invert md:prose-lg prose-img:aspect-[16/8] prose-img:object-cover prose-img:rounded my-4 md:mt-14 mb-14 mb:mb-16 mx-auto max-w-[700px] text-gray-950 dark:text-[#e8e6e3]" />
  <div class="max-w-[700px] m-auto">
    <NuxtLink
      v-for="tag in data.tags"
      :key="tag"
      :to="`/tag/${slugify(tag)}`"
      class="inline-flex text-sm text-gray-900 dark:text-neutral-200 bg-[#f2f2f2] dark:bg-[#1f2223] px-4 py-2 rounded-full mr-2">
      {{ tag }}
    </NuxtLink>
  </div>
  <LatestPosts />
</template>

<script setup>
import { slugify } from "~/utils/slugify";
const { path } = useRoute();

const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne();
});
</script>
