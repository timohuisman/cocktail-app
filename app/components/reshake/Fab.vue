<script setup lang="ts">
interface Props {
  /** Lucide icon name, default "plus". */
  icon?: string
  /** Accessible label, default "Check in". */
  label?: string
  /** Lift it 14px above the bottom nav. */
  raised?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'plus',
  label: 'Check in',
  raised: false,
})

defineEmits<{ click: [] }>()

const cls = computed(() => ['rs-fab', props.raised ? 'rs-fab--raised' : ''])
</script>

<template>
  <button type="button" :class="cls" :aria-label="label" :title="label" @click="$emit('click')">
    <ReshakeIcon :name="icon" :size="24" :stroke-width="2" />
  </button>
</template>
