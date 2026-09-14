<script setup lang="ts">
interface Props {
  /** The number itself, e.g. 12 or "8". */
  value: string | number
  label: string
  /** Small tertiary line under the label. */
  caption?: string
  /** Lucide icon name above the number, e.g. "bottle-wine". Renders 26px in a 44px tinted circle. */
  icon?: string
  /** Icon stroke colour — a flavour 500, e.g. var(--grape-500) (default). */
  iconColor?: string
  /** Icon circle fill — the matching 100, e.g. var(--grape-100) (default). */
  iconTint?: string
  /** lg = 64px stat-display (default), sm = 48px heading-1. */
  size?: 'lg' | 'sm'
}

const props = withDefaults(defineProps<Props>(), {
  caption: undefined,
  icon: undefined,
  iconColor: 'var(--grape-500)',
  iconTint: 'var(--grape-100)',
  size: 'lg',
})

const valueCls = computed(() => ['rs-stat-card__value', props.size === 'sm' ? 'rs-stat-card__value--sm' : ''])
</script>

<template>
  <div class="rs-stat-card">
    <span v-if="icon" class="rs-stat-card__icon" :style="{ background: iconTint }">
      <ReshakeIcon :name="icon" :size="26" :stroke-width="2" :color="iconColor" />
    </span>
    <span :class="valueCls">{{ value }}</span>
    <span class="rs-stat-card__label">{{ label }}</span>
    <span v-if="caption" class="rs-stat-card__caption">{{ caption }}</span>
  </div>
</template>
