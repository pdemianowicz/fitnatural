// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content", "@nuxt/icon", "@nuxt/image", "dayjs-nuxt", "@vueuse/nuxt"],
  // nitro: {
  //   static: true,
  //   compressPublicAssets: true,
  //   routeRules: {
  //     // Cache dla całej strony głównej na 5 minut
  //     "/": { cache: { swr: true, maxAge: 300 } },
  //     // Cache dla ścieżek `/posts/**`
  //     "/posts/**": { cache: { swr: true, maxAge: 86400 } }, // 1 dzień
  //   },
  // },
  runtimeConfig: {
    public: {
      BLOG_NAME: "Fitnatural",
    },
  },
  app: {
    head: {
      titleTemplate: "Fitnatural - %s",
      meta: [{ name: "description", content: "It is the ..." }],
      htmlAttrs: { lang: "pl-PL" },
      script: [
        {
          children: `
            (function() {
              const storedTheme = localStorage.theme;
              const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
              if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            })();
          `,
          type: "text/javascript",
        },
      ],
    },
  },
  content: {
    markdown: {
      anchorLinks: false,
    },
    highlight: {
      theme: "nord",
      preload: ["ts", "js", "css", "java", "json", "bash", "vue"],
    },
  },
  image: {
    provider: "netlify",
    netlify: {
      baseURl: process.env.IMAGES_URL,
    },
    ipx: {
      modifiers: {
        format: "webp",
        quality: 60,
      },
    },
  },
  dayjs: {
    locales: ["pl"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "pl",
    defaultTimezone: "Europe/Warsaw",
  },
});
