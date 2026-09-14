<script setup lang="ts">
const route = useRoute()
const { user, clear } = useUserSession()

const navItems = [
  { id: 'discover', label: 'Ontdekken', icon: 'martini', to: '/' },
  { id: 'what-can-i-make', label: 'Wat kan ik maken', icon: 'sparkles', to: '/what-can-i-make' },
  { id: 'recipes', label: 'Mijn recepten', icon: 'book-open', to: '/recipes' },
  { id: 'favorites', label: 'Favorieten', icon: 'heart', to: '/favorites' },
]

async function logout() {
  await clear()
  await navigateTo('/login')
}

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
      <ReshakeSidebarNav class="rs-shell__sidebar" brand="Reshake" :items="navItems" :active-id="activeId" @select="onSelect">
        <template v-if="user" #footer>
          <div class="rs-sidebar-user">
            <ReshakeAvatar :name="user.username" :src="user.thumb" :size="32" />
            <span class="rs-sidebar-user__name">{{ user.username }}</span>
            <ReshakeIconButton icon="log-out" label="Uitloggen" size="md" @click="logout" />
          </div>
        </template>
      </ReshakeSidebarNav>
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

<style scoped>
.rs-sidebar-user {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}
.rs-sidebar-user__name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
