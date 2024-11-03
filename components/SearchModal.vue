<template>
  <Transition name="fade">
    <div v-if="isSearchOpen" class="fixed inset-0 z-50">
      <div class="flex items-center justify-center min-h-screen">
        <div @click="toggleSearch" class="fixed inset-0 z-20 bg-[#00000080]" aria-hidden="true"></div>
        <div class="w-screen h-screen md:w-[600px] md:h-[600px] md:rounded-2xl bg-white dark:bg-bgDark md:shadow-lg z-50">
          <div class="flex items-center justify-center p-2 md:p-4 md:py-3 gap-3 border-b border-neutral-300 dark:border-neutral-700">
            <Icon name="lucide:search" size="1.25rem" class="shrink-0" />
            <label for="search" class="sr-only">Search</label>
            <input
              id="search"
              ref="searchInputRef"
              v-model="searchQuery"
              name="search"
              type="search"
              placeholder="Szukaj na blogu"
              autocomplete="off"
              class="w-full text-gray-900 dark:text-neutral-200 dark:bg-bgDark outline-none" />
            <button
              @click="closeSearch"
              class="text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
              <span class="group inline-flex shrink-0 justify-center items-center size-9">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </span>
            </button>
          </div>
          <div class="flex flex-col py-2 mb-10">
            <div class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-neutral-400">
              {{ searchQuery ? "Wyniki wyszukiwania" : "Najnowsze artykuły" }}
            </div>
            <div v-if="filteredPosts.length === 0" class="text-center text-gray-600 dark:text-neutral-400">Brak wyników dla "{{ searchQuery }}"</div>
            <NuxtLink v-for="post in displayedPosts" :key="post.slug" :to="post._path" @click="selectArticle" class="px-2">
              <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-800">
                <NuxtImg :src="`/images/blog/${post.cover}`" sizes="60px" :alt="post.title" class="object-cover rounded w-10 h-10" />
                <div class="">
                  <div class="line-clamp-1 text-[15px] leading-5 font-medium">{{ post.title }}</div>
                  <div class="line-clamp-1 text-[13px] text-gray-600 dark:text-neutral-400">{{ post.description }}</div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <button
    @click="toggleSearch"
    type="button"
    class="text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
    aria-label="Search">
    <span class="inline-flex justify-center items-center size-9">
      <Icon name="lucide:search" size="1.15rem" />
    </span>
  </button>
</template>

<script setup>
const { data: posts } = await useAsyncData("posts", () => {
  return queryContent("/blog").find();
});

const isSearchOpen = ref(false);
const searchQuery = ref("");
const searchInputRef = ref(null);
const filteredPosts = ref(posts.value);
const displayedPosts = ref([]);

displayedPosts.value = posts.value.slice(0, 7);

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;

  if (!isSearchOpen.value) {
    searchQuery.value = "";
    filteredPosts.value = posts.value;
    displayedPosts.value = filteredPosts.value.slice(0, 7);
  }

  nextTick(() => {
    if (searchInputRef.value) {
      searchInputRef.value.focus();
    }
  });
};

const resetSearch = () => {
  searchQuery.value = "";
};

const closeSearch = () => {
  isSearchOpen.value = false;
  resetSearch();
};

const selectArticle = () => {
  toggleSearch();
  resetSearch();
};

const filterPosts = (query) => {
  return posts.value.filter(
    (post) => post.title.toLowerCase().includes(query.toLowerCase()) || post.description.toLowerCase().includes(query.toLowerCase())
  );
};

watch(searchQuery, (newQuery) => {
  filteredPosts.value = filterPosts(newQuery);
  displayedPosts.value = filteredPosts.value.slice(0, 7);
});
</script>

<style scoped>
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
