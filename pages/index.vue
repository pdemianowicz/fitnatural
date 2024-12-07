<template>
  <section class="flex flex-wrap sm:-mx-4 my-16">
    <article
      v-for="(post, index) in posts"
      :key="post.slug"
      :class="{ post: (index + 1) % 6 === 1 && index < posts.length - 2 }"
      class="flex flex-col flex-[1_1_302px] sm:px-4 mb-10 pb-10 border-b border-gray-200 dark:border-neutral-700">
      <NuxtLink :to="post._path">
        <div class="flex flex-[1_1_auto]">
          <NuxtImg
            :src="`/images/blog/${post.cover}`"
            sizes="650px"
            fetchPriority="high"
            :alt="post.title"
            class="object-cover w-full h-[200px] rounded aspect-video" />
        </div>
      </NuxtLink>
      <div class="post-content">
        <NuxtLink :to="post._path">
          <h2 class="text-lg font-semibold mt-4 line-clamp-2">{{ post.title }}</h2>
          <p class="text-gray-700 dark:text-[#c4bfb7] line-clamp-3">{{ post.description }}</p>
        </NuxtLink>
      </div>
    </article>
  </section>
</template>

<script setup>
const { data: posts } = await useAsyncData("posts", () => {
  return queryContent("/blog").sort({ date: -1 }).find();
});
</script>

<style scoped>
@media (min-width: 768px) {
  .post {
    display: flex;
    flex: 1 1 100%;
    flex-direction: row;

    img {
      min-height: 380px;
    }

    .post-content {
      display: flex;
      flex: 0 1 351px;
      padding-left: 40px;

      h2 {
        @apply line-clamp-none;
      }

      p {
        @apply line-clamp-6;
      }
    }
  }

  .post .post-content h2 {
    @apply text-3xl mt-0 mb-2;
  }
}
</style>
