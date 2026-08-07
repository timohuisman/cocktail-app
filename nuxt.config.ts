// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    cocktailDbApiBase: 'https://www.thecocktaildb.com/api/json/v1/1'
  },
  vite: {
    server: {
      allowedHosts: true
    }
  }
})
