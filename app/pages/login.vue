<script setup lang="ts">
definePageMeta({ layout: false })

const route = useRoute()
const loading = ref(false)

const errorMessage = computed(() => {
  switch (route.query.error) {
    case 'no_access':
      return 'Dit Plex-account heeft geen toegang tot de Plex-server. Vraag de beheerder om toegang.'
    case 'plex_failed':
      return 'Inloggen bij Plex is niet gelukt. Probeer het opnieuw.'
    default:
      return null
  }
})

async function loginWithPlex() {
  loading.value = true
  try {
    const { authUrl } = await $fetch<{ authUrl: string }>('/api/auth/plex/start', { method: 'POST' })
    window.location.href = authUrl
  } catch {
    loading.value = false
  }
}
</script>

<template>
  <div class="rs-page rs-login">
    <ReshakeGlassCard strong class="rs-login__card">
      <ReshakeIcon name="martini" :size="32" />
      <h1 class="rs-login__title">Cocktail App</h1>
      <p class="rs-login__subtitle">Log in met je Plex-account om verder te gaan.</p>
      <p v-if="errorMessage" class="rs-login__error">{{ errorMessage }}</p>
      <ReshakeButton icon-left="log-in" full-width :disabled="loading" @click="loginWithPlex">
        {{ loading ? 'Bezig...' : 'Inloggen met Plex' }}
      </ReshakeButton>
    </ReshakeGlassCard>
  </div>
</template>

<style scoped>
.rs-login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--space-xl);
  box-sizing: border-box;
}
.rs-login__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  max-width: 360px;
  width: 100%;
  text-align: center;
}
.rs-login__title {
  margin: 0;
}
.rs-login__subtitle {
  margin: 0 0 var(--space-xs);
  color: var(--text-muted, inherit);
}
.rs-login__error {
  margin: 0;
  color: var(--color-danger, #c0392b);
}
</style>
