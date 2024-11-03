<template>
  <div>
    <!-- Light Mode Icon -->
    <button
      v-if="!isDarkMode"
      @click="setDarkMode('dark')"
      class="text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
      aria-label="Dark mode">
      <span class="group inline-flex shrink-0 justify-center items-center size-9">
        <svg
          class="shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      </span>
    </button>

    <!-- Dark Mode Icon -->
    <button
      v-if="isDarkMode"
      @click="setDarkMode('light')"
      class="text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
      aria-label="Dark mode">
      <span class="group inline-flex shrink-0 justify-center items-center size-9">
        <svg
          class="shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup>
const isDarkMode = ref(false);

const setDarkMode = (mode) => {
  if (typeof window !== "undefined") {
    // Check if we're in the browser
    if (mode === "dark") {
      isDarkMode.value = true;
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      isDarkMode.value = false;
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }
};

onMounted(() => {
  if (typeof window !== "undefined") {
    // Ensure this only runs on the client
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode("dark");
    } else {
      setDarkMode("light");
    }
  }
});
</script>
