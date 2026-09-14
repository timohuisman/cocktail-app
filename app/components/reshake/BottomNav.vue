<script setup lang="ts">
export interface BottomNavItem {
  id: string
  label: string
  icon: string
}

interface Props {
  /** Four items; the FAB is injected in the middle. */
  items: BottomNavItem[]
  activeId?: string
  fabIcon?: string
  fabLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  activeId: undefined,
  fabIcon: 'plus',
  fabLabel: 'Check in',
})

const emit = defineEmits<{ select: [id: string]; checkIn: [] }>()

const half = computed(() => Math.ceil(props.items.length / 2))
const firstHalf = computed(() => props.items.slice(0, half.value))
const secondHalf = computed(() => props.items.slice(half.value))
</script>

<template>
  <nav class="rs-bottom-nav" aria-label="Hoofdnavigatie">
    <button
      v-for="it in firstHalf"
      :key="it.id"
      type="button"
      :class="['rs-bottom-nav__item', it.id === activeId ? 'rs-bottom-nav__item--active' : '']"
      :aria-current="it.id === activeId ? 'page' : undefined"
      @click="emit('select', it.id)"
    >
      <ReshakeIcon :name="it.icon" :size="20" />
      {{ it.label }}
    </button>
    <span class="rs-bottom-nav__slot">
      <ReshakeFab raised :icon="fabIcon" :label="fabLabel" @click="emit('checkIn')" />
    </span>
    <button
      v-for="it in secondHalf"
      :key="it.id"
      type="button"
      :class="['rs-bottom-nav__item', it.id === activeId ? 'rs-bottom-nav__item--active' : '']"
      :aria-current="it.id === activeId ? 'page' : undefined"
      @click="emit('select', it.id)"
    >
      <ReshakeIcon :name="it.icon" :size="20" />
      {{ it.label }}
    </button>
  </nav>
</template>
