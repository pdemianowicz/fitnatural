<template>
  <div class="flex flex-col min-h-screen text-black dark:text-textDark bg-white dark:bg-bgDark">
    <NuxtRouteAnnouncer />
    <Header />
    <main class="mx-auto max-w-[1050px] px-4 sm:px-6 grow w-full">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
useHead({
  titleTemplate: "%s - Fitnatural",
});
</script>
