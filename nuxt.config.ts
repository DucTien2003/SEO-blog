// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['@/assets/styles/styles.scss'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/image',
  ],
  vite: {
    optimizeDeps: {
      include: ['@ckeditor/ckeditor5-vue'],
    },
  },
});
