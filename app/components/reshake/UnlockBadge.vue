<script setup lang="ts">
interface Props {
  /** Number of recipes unlocked; rendered as "+{count} recepten". */
  count?: number
  label?: string
  size?: 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  count: 1,
  label: undefined,
  size: 'md',
})

const cls = computed(() => ['rs-badge', 'rs-badge--unlock', props.size === 'lg' ? 'rs-badge--lg' : ''])
</script>

<template>
  <span :class="cls">
    <ReshakeIcon name="lock-open" :size="size === 'lg' ? 14 : 12" :stroke-width="2.25" />
    {{ label || `+${count} recepten` }}
  </span>
</template>
