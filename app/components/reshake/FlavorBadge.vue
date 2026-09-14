<script setup lang="ts">
import { FLAVORS, type Flavor } from '~/utils/flavors'

interface Props {
  /** One of the six smaaktags. Each maps to a fixed pastel family. */
  flavor: Flavor
  /** Override the label (e.g. the Dutch "Zoet" instead of "Sweet"). */
  label?: string
  /** Show a saturated -500 dot before the label. */
  dot?: boolean
  /** md = caption-bold (default), lg = body-sm-medium. */
  size?: 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  flavor: 'sweet',
  label: undefined,
  dot: false,
  size: 'md',
})

const meta = computed(() => FLAVORS[props.flavor] ?? FLAVORS.sweet)
const cls = computed(() => ['rs-badge', `rs-badge--${props.flavor}`, props.size === 'lg' ? 'rs-badge--lg' : ''])
</script>

<template>
  <span :class="cls">
    <span v-if="dot" class="rs-badge__dot" :style="{ background: meta.accent }" />
    {{ label || meta.label }}
  </span>
</template>
