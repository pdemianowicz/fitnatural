<template>
  <footer class="bg-[#f8f9fa] dark:bg-[#1b1e1f]">
    <section>
      <div class="container max-w-[1050px] mx-auto px-2 sm:px-4 py-4 lg:py-6 text-[#5f6368] dark:text-[#a9a297] flex flex-col md:flex-row gap-4">
        <p class="order-1 md:order-none text-center md:text-start flex-1 text-sm md:text-base">
          <NuxtLink to="/">{{ runtimeConfig.public.BLOG_NAME }}</NuxtLink>
          &copy; 2024
        </p>
        <nav class="flex flex-wrap items-center justify-center gap-5 text-sm">
          <NuxtLink to="/blog">Blog</NuxtLink>
          <NuxtLink to="/o-mnie">O mnie</NuxtLink>
          <NuxtLink to="/kontakt">Kontakt</NuxtLink>
          <NuxtLink to="/polityka-prywatnosci">Polityka prywatności</NuxtLink>
        </nav>
      </div>
    </section>
  </footer>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
</script>

<style scoped></style>
