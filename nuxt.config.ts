import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxt/fonts"],

  css: ["~/assets/css/main.css", "~/assets/main.scss"],

  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  runtimeConfig: {
    quizApiUrl: "",
  },

  vite: {
    plugins: [tailwindcss() as any],
  },
});
