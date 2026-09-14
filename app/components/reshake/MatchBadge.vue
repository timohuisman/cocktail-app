<script setup lang="ts">
interface Props {
  /** Shown as "{percentage}% match" when no label is given. */
  percentage?: number
  label?: string
  /** Lucide icon name; pass null to drop it. */
  icon?: string | null
  size?: 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  percentage: 100,
  label: undefined,
  icon: 'check',
  size: 'md',
})

const cls = computed(() => ['rs-badge', 'rs-badge--match', props.size === 'lg' ? 'rs-badge--lg' : ''])
</script>

<template>
  <span :class="cls">
    <ReshakeIcon v-if="icon" :name="icon" :size="size === 'lg' ? 14 : 12" :stroke-width="2.5" />
    {{ label || `${percentage}% match` }}
  </span>
</template>
