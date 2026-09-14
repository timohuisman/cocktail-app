<script setup lang="ts">
/* No logo file ships with the brief: the wordmark is set in plain Satoshi. */
export interface SidebarNavItem {
  id: string
  label: string
  icon?: string
  count?: number
}

interface Props {
  /** Wordmark text; no logo file ships with the system. */
  brand?: string
  items: SidebarNavItem[]
  activeId?: string
}

withDefaults(defineProps<Props>(), {
  brand: 'Reshake',
  activeId: undefined,
})

defineEmits<{ select: [id: string] }>()
</script>

<template>
  <nav class="rs-sidebar" aria-label="Hoofdnavigatie">
    <span class="rs-wordmark">{{ brand }}</span>
    <button
      v-for="it in items"
      :key="it.id"
      type="button"
      :class="['rs-nav-item', it.id === activeId ? 'rs-nav-item--active' : '']"
      :aria-current="it.id === activeId ? 'page' : undefined"
      @click="$emit('select', it.id)"
    >
      <ReshakeIcon v-if="it.icon" :name="it.icon" :size="18" />
      {{ it.label }}
      <span v-if="it.count != null" class="rs-nav-item__count">{{ it.count }}</span>
    </button>
    <div v-if="$slots.footer" class="rs-sidebar__footer">
      <slot name="footer" />
    </div>
  </nav>
</template>
