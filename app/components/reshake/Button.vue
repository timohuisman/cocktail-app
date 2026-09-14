<script setup lang="ts">
/**
 * Pill button — the primary interaction signature of Reshake.
 */
interface Props {
  /** primary = plum fill, secondary = outline, glass = frosted (on gradient), ghost = bare. */
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost'
  /** Lucide icon name, rendered before the label. */
  iconLeft?: string
  /** Lucide icon name, rendered after the label. */
  iconRight?: string
  fullWidth?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  /** Render as a link instead of a button. */
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  iconLeft: undefined,
  iconRight: undefined,
  fullWidth: false,
  disabled: false,
  type: 'button',
  href: undefined,
})

const cls = computed(() => ['rs-btn', `rs-btn--${props.variant}`, props.fullWidth ? 'rs-btn--full' : ''])
</script>

<template>
  <NuxtLink v-if="href && !disabled" :class="cls" :to="href">
    <ReshakeIcon v-if="iconLeft" :name="iconLeft" :size="16" />
    <span><slot /></span>
    <ReshakeIcon v-if="iconRight" :name="iconRight" :size="16" />
  </NuxtLink>
  <button v-else :class="cls" :type="type" :disabled="disabled">
    <ReshakeIcon v-if="iconLeft" :name="iconLeft" :size="16" />
    <span><slot /></span>
    <ReshakeIcon v-if="iconRight" :name="iconRight" :size="16" />
  </button>
</template>
