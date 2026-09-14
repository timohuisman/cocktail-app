<script setup lang="ts">
import type { Flavor } from '~/utils/flavors'

/**
 * Recipe tile for the Discover grid.
 */
interface Props {
  title: string
  /** Secondary line, e.g. "Gin · 3 ingredienten". */
  meta?: string
  image?: string
  /** Placeholder tint when there is no image. */
  tint?: string
  flavors?: Flavor[]
  /** Stock match percentage; renders a MatchBadge. */
  match?: number
  /** Number of missing ingredients; renders a neutral "{n} mist" badge. */
  missing?: number
}

withDefaults(defineProps<Props>(), {
  meta: undefined,
  image: undefined,
  tint: undefined,
  flavors: () => [],
  match: undefined,
  missing: undefined,
})

defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <button type="button" class="rs-recipe-card" @click="$emit('click', $event)">
    <ReshakeMedia :src="image" :tint="tint" :alt="title" />
    <div style="display: flex; flex-direction: column; gap: 6px">
      <span class="rs-recipe-card__title">{{ title }}</span>
      <span v-if="meta" class="rs-recipe-card__meta">{{ meta }}</span>
    </div>
    <div class="rs-recipe-card__tags">
      <ReshakeMatchBadge v-if="match != null" :percentage="match" />
      <span v-if="missing" class="rs-badge rs-badge--neutral">{{ missing }} mist</span>
      <ReshakeFlavorBadge v-for="f in flavors" :key="f" :flavor="f" />
    </div>
  </button>
</template>
