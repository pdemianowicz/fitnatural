<template>
  <header>
    <div class="max-w-screen-lg m-auto">
      <h1 class="text-2xl md:text-4xl mb-4 md:mb-4">{{ title }}</h1>
      <div class="flex flex-wrap items-center gap-3 text-sm font-medium">
        <NuxtLink v-for="(c, index) in category" :key="index" :to="`/category/${slugify(c)}`" class="underline hover:no-underline">
          {{ c }}
        </NuxtLink>
        <span>·</span>
        <div>{{ $dayjs(date).format("D MMMM YYYY") }}</div>
        <span>·</span>
        <div>{{ readingTime }} min czytania</div>
      </div>
    </div>
    <div class="-mx-4 sm:-mx-6 lg:-mx-20 aspect-[16/8]">
      <NuxtImg
        :src="`/images/blog/${cover}`"
        sizes="sm:450px md:748px lg:860px"
        fetchPriority="high"
        :alt="title"
        class="object-cover w-full h-full md:rounded mt-4 md:mt-4" />
    </div>
  </header>
</template>

<script setup>
import { slugify } from "~/utils/slugify.js";
const props = defineProps({
  title: {
    type: String,
    default: "Default title",
  },
  category: {
    type: Array,
    default: () => ["kategoria"],
  },
  date: {
    type: String,
    default: "01 stycznia 1980",
  },
  cover: {
    type: String,
    default: "Default image",
  },
  alt: {
    type: String,
    default: "Default alt",
  },
});

const route = useRoute();
const { data: post } = await useAsyncData("post", () => queryContent(`/blog/${route.params.slug}`).findOne());

const extractTextFromMarkdown = (children) => {
  return children
    .map((child) => {
      if (child.type === "text") {
        return child.value;
      } else if (child.children) {
        return extractTextFromMarkdown(child.children);
      }
      return "";
    })
    .join(" ");
};

const text = extractTextFromMarkdown(post.value.body.children);
const wordCount = text.split(/\s+/).length;
const WORDS_PER_MINUTE = 250;
const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE);
</script>
