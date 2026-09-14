<script setup lang="ts">
/**
 * The frosted-glass panel every dashboard block is built from.
 */
interface Props {
  /** 72% white instead of 55% — for content that needs more legibility. */
  strong?: boolean
  radius?: 'xl' | 'xxl' | 'xxxl'
  padding?: 'lg' | 'xl' | 'xxl'
  /** Drop the glass shadow (for nested glass). */
  flat?: boolean
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  strong: false,
  radius: 'xl',
  padding: 'xl',
  flat: false,
  as: 'div',
})

const cls = computed(() => [
  'rs-card-glass',
  props.strong ? 'rs-card-glass--strong' : '',
  props.radius !== 'xl' ? `rs-card-glass--r-${props.radius}` : '',
  props.padding !== 'xl' ? `rs-card-glass--p-${props.padding}` : '',
  props.flat ? 'rs-card-glass--flat' : '',
])
</script>

<template>
  <component :is="as" :class="cls">
    <slot />
  </component>
</template>
