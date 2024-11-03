<template>
  <article v-for="(post, index) in posts" :key="post.slug">
    <NuxtLink :to="post._path">
      <div>
        <NuxtImg
          :src="`/images/blog/${post.cover}`"
          sizes="400px"
          :loading="index < 9 ? 'eager' : 'lazy'"
          fetchPriority="high"
          :alt="post.title"
          class="object-cover w-full h-full rounded aspect-video" />
      </div>
    </NuxtLink>

    <div>
      <NuxtLink :to="post._path">
        <h2 class="text-lg font-semibold mt-4 line-clamp-2">{{ post.title }}</h2>
        <p class="text-gray-700 dark:text-[#c4bfb7] line-clamp-3">{{ post.description }}</p>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup>
const props = defineProps(["posts"]);
</script>

<style scoped></style>
