<script setup lang="ts">
import type { SocialUser } from '~/utils/social'

interface Props {
  users: SocialUser[]
  /** How many to show before a "+n" chip, default 4. */
  max?: number
  /** Pixel size of each avatar, default 32. */
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  max: 4,
  size: 32,
})

const shown = computed(() => props.users.slice(0, props.max))
const remaining = computed(() => props.users.length - shown.value.length)
</script>

<template>
  <span class="rs-avatar-stack">
    <ReshakeAvatar v-for="(u, i) in shown" :key="u.name || i" :name="u.name" :src="u.avatar" :tint="u.tint" :size="size" />
    <span v-if="remaining > 0" class="rs-avatar-stack__more" :style="{ width: `${size}px`, height: `${size}px` }">+{{ remaining }}</span>
  </span>
</template>
