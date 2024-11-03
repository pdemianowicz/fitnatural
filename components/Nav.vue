<template>
  <div
    :class="{
      'hidden md:flex': !isOpen,
      'flex flex-col md:flex-row absolute top-14 left-0 z-10 w-full md:w-auto px-2 sm:px-4 py-3 shadow-lg bg-white dark:bg-bgDark md:static md:shadow-none':
        isOpen,
    }"
    class="transition-all duration-300 ease-in-out">
    <template v-for="item in navigation">
      <div v-if="item.subcategories" class="relative" @mouseenter="isSubmenuOpen = true" @mouseleave="isSubmenuOpen = false">
        <div
          @click="isSubmenuOpen = !isSubmenuOpen"
          class="px-3 py-2 font-medium text-sm hover:bg-gray-200 rounded-md dark:text-neutral-200 dark:hover:bg-neutral-800 flex items-center cursor-pointer"
          aria-label="Go to {{ item.name }}">
          {{ item.name }}
          <svg
            class="ml-1 h-4 w-4 transform transition-transform duration-300"
            :class="{ 'rotate-180': isSubmenuOpen }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div v-show="isSubmenuOpen" class="md:absolute md:left-0 md:top-full md:w-48 bg-white dark:bg-neutral-900 md:shadow-lg md:rounded-md">
          <NuxtLink
            @click="closeMenu"
            v-for="subcategory in item.subcategories"
            :key="subcategory.href"
            :to="subcategory.href"
            class="block px-4 py-2 text-sm font-medium text-gray-900 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800 [&:not(:last-child)]:border-b border-gray-300 dark:border-neutral-800">
            {{ subcategory.name }}
          </NuxtLink>
        </div>
      </div>

      <NuxtLink
        @click="closeMenu"
        v-else
        :key="item.href"
        :to="item.href"
        class="px-3 py-2 font-medium text-sm hover:bg-gray-200 rounded-md dark:text-neutral-200 dark:hover:bg-neutral-800"
        aria-label="Przejdź do {{ item.name }}">
        {{ item.name }}
      </NuxtLink>
    </template>
  </div>

  <button
    @click="isOpen = !isOpen"
    type="button"
    class="order-1 md:hidden relative inline-flex items-center justify-center p-2 text-gray-800 dark:text-gray-400 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
    aria-label="Toggle menu"
    :aria-expanded="isOpen ? 'true' : 'false'">
    <span class="absolute -inset-0.5"></span>
    <span class="sr-only">Open main menu</span>
    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
      <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      <path v-else="isOpen" stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  </button>
</template>

<script setup>
const isOpen = ref(false);
const isSubmenuOpen = ref(false);

const closeMenu = () => {
  isOpen.value = false;
  isSubmenuOpen.value = false;
};

const { data: posts } = await useAsyncData("posts", () => queryContent("/blog").sort({ date: -1 }).find());

const categories = Array.from(
  new Set(posts.value.flatMap((post) => post.category).filter((category) => category !== undefined && category.length > 0))
);

import { slugify } from "~/utils/slugify";
const category = categories.map((name) => ({ name: name, href: `/category/${slugify(name)}` }));

const navigation = computed(() => [
  { name: "Artykuły", href: "/blog" },
  {
    name: "Kategorie",
    subcategories: category,
  },
  { name: "Kalkulator kalorii", href: "/kalkulator-zapotrzebowania-kalorycznego" },
]);
</script>

<style lang="scss" scoped></style>
