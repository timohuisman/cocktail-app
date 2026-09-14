<script setup lang="ts">
import type { Flavor } from '~/utils/flavors'
import type { SocialUser } from '~/utils/social'

/**
 * Social check-in card.
 */
interface Props {
  user: SocialUser
  /** Relative time, e.g. "2 u". */
  time?: string
  /** The cocktail checked in. */
  drink?: string
  /** Free-text place, e.g. "bij Mark thuis". */
  location?: string
  rating?: number
  /** The twist note. */
  note?: string
  /** Photo URL, or false to omit the media block. */
  photo?: string | false
  tint?: string
  flavors?: Flavor[]
  tagged?: SocialUser[]
  likes?: number
  comments?: number
  liked?: boolean
}

withDefaults(defineProps<Props>(), {
  time: undefined,
  drink: undefined,
  location: undefined,
  rating: undefined,
  note: undefined,
  photo: undefined,
  tint: undefined,
  flavors: () => [],
  tagged: () => [],
  likes: 0,
  comments: 0,
  liked: false,
})

defineEmits<{ like: []; comment: [] }>()
</script>

<template>
  <article class="rs-feed-post">
    <header class="rs-feed-post__head">
      <ReshakeAvatar :name="user?.name" :src="user?.avatar" :tint="user?.tint" />
      <div style="display: flex; flex-direction: column; flex: 1; min-width: 0">
        <span class="rs-feed-post__name">
          {{ user?.name }}
          <span style="font: var(--type-body-sm); color: var(--slate)">
            <template v-if="drink">
              checkte in met
              <strong style="font: var(--type-body-sm-medium); color: var(--ink)">{{ drink }}</strong>
            </template>
          </span>
        </span>
        <span class="rs-feed-post__time">{{ time }}{{ location ? ` · ${location}` : '' }}</span>
      </div>
      <ReshakeRatingBadge v-if="rating != null" :value="rating" />
    </header>
    <ReshakeMedia v-if="photo !== false" :src="typeof photo === 'string' ? photo : undefined" :tint="tint" :alt="drink" />
    <p v-if="note" class="rs-feed-post__note">{{ note }}</p>
    <div v-if="flavors.length" style="display: flex; gap: 6px; flex-wrap: wrap">
      <ReshakeFlavorBadge v-for="f in flavors" :key="f" :flavor="f" />
    </div>
    <div v-if="tagged.length" style="display: flex; align-items: center; gap: var(--space-xs)">
      <ReshakeAvatarStack :users="tagged" :size="28" />
      <span style="font: var(--type-caption); color: var(--text-secondary)">
        met {{ tagged.map((t) => t.name).join(', ') }}
      </span>
    </div>
    <div class="rs-feed-post__actions">
      <button type="button" :class="['rs-feed-action', liked ? 'rs-feed-action--on' : '']" @click="$emit('like')">
        <ReshakeIcon name="heart" :size="16" :style="liked ? { fill: 'var(--blush-500)' } : undefined" />
        {{ likes }}
      </button>
      <button type="button" class="rs-feed-action" @click="$emit('comment')">
        <ReshakeIcon name="message-circle" :size="16" />
        {{ comments }}
      </button>
    </div>
    <slot />
  </article>
</template>
