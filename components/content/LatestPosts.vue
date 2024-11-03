<template>
  <section class="my-24 border-t border-neutral-200 dark:border-neutral-600">
    <h2 class="text-3xl font-medium text-center mt-8">Powiązane artykuły</h2>
    <div class="grid md:grid-cols-3 pt-8 gap-10">
      <Post :posts="relatedPosts" />
    </div>
  </section>
</template>

<script setup>
const route = useRoute();

const { data: post } = await useAsyncData("post", () =>
  queryContent()
    .where({ _path: `/blog/${route.params.slug}` })
    .findOne()
);

const { data: relatedPosts } = await useAsyncData("relatedPosts", () =>
  queryContent("/blog")
    .where({
      tags: { $containsAny: post.value.tags },
      _path: { $ne: post.value._path },
    })
    .sort({ date: -1 })
    .limit(3)
    .find()
);
</script>

<style scoped></style>
