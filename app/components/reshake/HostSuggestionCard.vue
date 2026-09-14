<script setup lang="ts">
import type { SocialUser } from '~/utils/social'

interface Props {
  /** Small uppercase label, default "Gastheer-modus". */
  eyebrow?: string
  title: string
  body?: string
  /** Guests present; rendered as an AvatarStack. */
  guests?: SocialUser[]
  cta?: string
}

withDefaults(defineProps<Props>(), {
  eyebrow: 'Gastheer-modus',
  body: undefined,
  guests: () => [],
  cta: undefined,
})

defineEmits<{ cta: [] }>()
</script>

<template>
  <section class="rs-host-card">
    <span class="rs-host-card__eyebrow">{{ eyebrow }}</span>
    <h3 class="rs-host-card__title">{{ title }}</h3>
    <p v-if="body" class="rs-host-card__body">{{ body }}</p>
    <div v-if="guests.length" style="display: flex; align-items: center; gap: var(--space-xs)">
      <ReshakeAvatarStack :users="guests" :size="28" />
      <span style="font: var(--type-caption); color: var(--mint-700)">{{ guests.length }} gasten aanwezig</span>
    </div>
    <slot />
    <div v-if="cta"><ReshakeButton @click="$emit('cta')">{{ cta }}</ReshakeButton></div>
  </section>
</template>
