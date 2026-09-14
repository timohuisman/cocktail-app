// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-auth-utils'],
  css: ['~/assets/css/reshake/styles.css', '~/assets/css/reshake/app.css'],
  runtimeConfig: {
    cocktailDbApiBase: 'https://www.thecocktaildb.com/api/json/v1/1',
    public: {
      // Skips the Plex login requirement. Only meant for local development
      // (NUXT_PUBLIC_AUTH_DISABLED=true) — never enable this in production.
      authDisabled: false
    }
  },
  vite: {
    server: {
      allowedHosts: true
    }
  }
})
