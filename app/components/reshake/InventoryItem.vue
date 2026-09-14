<script setup lang="ts">
interface Props {
  name: string
  /** Category line, e.g. "Gin · 70cl". */
  category?: string
  /** Recipes unlocked by this bottle; renders an UnlockBadge. */
  unlocks?: number
  /** Icon circle fill, e.g. var(--sky-100). */
  tint?: string
  /** Lucide icon name, default "bottle-wine". */
  icon?: string
  inStock?: boolean
  /** Shows a circular toggle on the right. */
  toggleable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  category: undefined,
  unlocks: undefined,
  tint: 'var(--surface-soft)',
  icon: 'bottle-wine',
  inStock: true,
  toggleable: false,
})

defineEmits<{ toggle: [] }>()

const cls = computed(() => ['rs-inventory-item', props.inStock ? '' : 'rs-inventory-item--out'])
</script>

<template>
  <div :class="cls">
    <span class="rs-inventory-item__icon" :style="{ background: tint }">
      <ReshakeIcon :name="icon" :size="20" color="var(--slate)" />
    </span>
    <div style="display: flex; flex-direction: column; flex: 1; min-width: 0">
      <span class="rs-inventory-item__name">{{ name }}</span>
      <span class="rs-inventory-item__meta">{{ category }}{{ inStock ? '' : ' · niet op voorraad' }}</span>
    </div>
    <ReshakeUnlockBadge v-if="unlocks != null" :count="unlocks" />
    <slot name="trailing" />
    <button
      v-if="toggleable"
      type="button"
      class="rs-icon-btn"
      :aria-label="inStock ? 'Markeer als op' : 'Markeer als aanwezig'"
      @click="$emit('toggle')"
    >
      <ReshakeIcon :name="inStock ? 'check' : 'plus'" :size="16" />
    </button>
  </div>
</template>
