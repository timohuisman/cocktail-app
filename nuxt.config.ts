// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/reshake/styles.css', '~/assets/css/reshake/app.css'],
  runtimeConfig: {
    cocktailDbApiBase: 'https://www.thecocktaildb.com/api/json/v1/1'
  },
  vite: {
    server: {
      allowedHosts: true
    }
  }
})
