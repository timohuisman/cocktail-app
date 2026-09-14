<script setup lang="ts">
interface Props {
  /** Lucide icon name; omit to pass a custom glyph via the default slot. */
  icon?: string
  /** Required accessible label (also the tooltip). */
  label: string
  variant?: 'default' | 'glass' | 'primary'
  /** md = 40px (default), lg = 48px. */
  size?: 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  variant: 'default',
  size: 'md',
  disabled: false,
})

const cls = computed(() => [
  'rs-icon-btn',
  `rs-icon-btn--${props.variant}`,
  props.size === 'lg' ? 'rs-icon-btn--lg' : '',
])
</script>

<template>
  <button :class="cls" type="button" :aria-label="label" :title="label" :disabled="disabled">
    <slot>
      <ReshakeIcon v-if="icon" :name="icon" :size="size === 'lg' ? 22 : 18" />
    </slot>
  </button>
</template>
