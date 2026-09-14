<script setup lang="ts">
const route = useRoute()

const navItems = [
  { id: 'discover', label: 'Ontdekken', icon: 'martini', to: '/' },
  { id: 'what-can-i-make', label: 'Wat kan ik maken', icon: 'sparkles', to: '/what-can-i-make' },
  { id: 'recipes', label: 'Mijn recepten', icon: 'book-open', to: '/recipes' },
  { id: 'favorites', label: 'Favorieten', icon: 'heart', to: '/favorites' },
]

const activeId = computed(() => {
  const match = navItems.find((item) => (item.to === '/' ? route.path === '/' : route.path.startsWith(item.to)))
  return match?.id ?? 'discover'
})

function onSelect(id: string) {
  const item = navItems.find((i) => i.id === id)
  if (item) navigateTo(item.to)
}
</script>

<template>
  <div class="rs-page">
    <div class="rs-container rs-shell">
      <ReshakeSidebarNav class="rs-shell__sidebar" brand="Reshake" :items="navItems" :active-id="activeId" @select="onSelect" />
      <main class="rs-shell__main">
        <slot />
      </main>
    </div>
    <ReshakeBottomNav
      class="rs-shell__bottom-nav"
      :items="navItems"
      :active-id="activeId"
      fab-icon="plus"
      fab-label="Nieuw recept"
      @select="onSelect"
      @check-in="navigateTo('/recipes/new')"
    />
  </div>
</template>
