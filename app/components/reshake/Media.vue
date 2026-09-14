<script setup lang="ts">
/* 4:3 media block. No photography ships with the system — without `src` this
   renders a flavor-tinted placeholder so layouts read correctly. */
interface Props {
  /** Photo URL. Without it, a flavour-tinted placeholder renders. */
  src?: string
  alt?: string
  /** Placeholder fill, e.g. var(--blush-100). */
  tint?: string
  /** Lucide icon shown in the placeholder. */
  icon?: string
  ratio?: '4-3' | '1-1' | '16-9'
  /** Small caption inside the placeholder (e.g. "foto volgt"). */
  note?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: undefined,
  alt: '',
  tint: 'var(--surface-soft)',
  icon: 'martini',
  ratio: '4-3',
  note: undefined,
})

const cls = computed(() => ['rs-media', props.ratio === '1-1' ? 'rs-media--square' : '', props.ratio === '16-9' ? 'rs-media--wide' : ''])
</script>

<template>
  <div :class="cls" :style="{ background: src ? undefined : tint }">
    <img v-if="src" :src="src" :alt="alt">
    <ReshakeIcon v-else :name="icon" :size="32" color="rgba(36,27,46,0.28)" />
    <span v-if="note && !src" class="rs-media__note">{{ note }}</span>
  </div>
</template>
