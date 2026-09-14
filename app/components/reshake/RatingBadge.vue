<script setup lang="ts">
interface Props {
  /** 0-5, rendered with a Dutch decimal comma. */
  value?: number
  /** Optional number of ratings, shown in parentheses. */
  count?: number
  /** rating = bordered surface pill (default); on-glass for use over frosted panels. */
  variant?: 'rating' | 'on-glass'
}

const props = withDefaults(defineProps<Props>(), {
  value: 4.5,
  count: undefined,
  variant: 'rating',
})

const cls = computed(() => ['rs-badge', `rs-badge--${props.variant}`])
const formatted = computed(() => Number(props.value).toFixed(1).replace('.', ','))
</script>

<template>
  <span :class="cls">
    <ReshakeIcon name="star" :size="12" color="var(--citrus-500)" style="fill: var(--citrus-500)" />
    {{ formatted }}
    <span v-if="count != null" style="color: var(--text-tertiary); font: var(--type-micro)">({{ count }})</span>
  </span>
</template>
