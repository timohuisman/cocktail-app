<script setup lang="ts">
import type { Flavor } from '~/utils/flavors'

/**
 * Recipe detail header panel.
 */
interface Props {
  title: string
  description?: string
  flavors?: Flavor[]
  match?: number
  rating?: number
  ratingCount?: number
  /** Small neutral meta badge, e.g. "5 min · Shaken". */
  meta?: string
  /** Primary CTA label; defaults to "Check in". */
  cta?: string
  secondary?: string
}

withDefaults(defineProps<Props>(), {
  description: undefined,
  flavors: () => [],
  match: undefined,
  rating: undefined,
  ratingCount: undefined,
  meta: undefined,
  cta: 'Check in',
  secondary: undefined,
})

defineEmits<{ cta: []; secondary: [] }>()
</script>

<template>
  <section class="rs-recipe-hero">
    <div class="rs-recipe-hero__row">
      <ReshakeMatchBadge v-if="match != null" :percentage="match" size="lg" />
      <ReshakeRatingBadge v-if="rating != null" :value="rating" :count="ratingCount" />
      <span v-if="meta" class="rs-badge rs-badge--on-glass">{{ meta }}</span>
    </div>
    <h1 class="rs-recipe-hero__title">{{ title }}</h1>
    <p v-if="description" class="rs-recipe-hero__sub">{{ description }}</p>
    <div v-if="flavors.length" class="rs-recipe-hero__row">
      <ReshakeFlavorBadge v-for="f in flavors" :key="f" :flavor="f" size="lg" dot />
    </div>
    <slot />
    <div class="rs-recipe-hero__row" style="gap: var(--space-sm); margin-top: var(--space-xs)">
      <ReshakeButton v-if="cta" icon-left="plus" @click="$emit('cta')">{{ cta }}</ReshakeButton>
      <ReshakeButton v-if="secondary" variant="glass" @click="$emit('secondary')">{{ secondary }}</ReshakeButton>
    </div>
  </section>
</template>
