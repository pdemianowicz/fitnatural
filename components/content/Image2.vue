<template>
  <NuxtImg :src="imgSrc" :alt="alt" sizes="sm:100vw md:50vw lg:700px" loading="lazy" class="w-full h-full" />
</template>

<script setup>
defineProps(["imgSrc", "alt"]);
</script>
