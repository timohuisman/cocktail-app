<script setup lang="ts">
interface Props {
  name?: string
  /** Photo URL; without it, initials render. */
  src?: string
  /** Pixel size, default 40. */
  size?: number
  /** Background fill for the initials state, e.g. var(--blush-100). */
  tint?: string
  /** Use the glass border instead of white (for avatars on glass). */
  ring?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  src: undefined,
  size: 40,
  tint: undefined,
  ring: false,
})

const initials = computed(() =>
  props.name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)

const cls = computed(() => ['rs-avatar', props.ring ? 'rs-avatar--ring' : ''])
const style = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  background: props.tint,
  fontSize: `${Math.max(10, Math.round(props.size * 0.32))}px`,
}))
</script>

<template>
  <span :class="cls" :style="style" :title="name">
    <img v-if="src" :src="src" :alt="name">
    <template v-else>{{ initials }}</template>
  </span>
</template>
