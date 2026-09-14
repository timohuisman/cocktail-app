<script setup lang="ts">
interface Props {
  label: string
  /** Active = plum-light fill, grape border and text. */
  active?: boolean
  /** Optional result count shown after the label. */
  count?: number
  /** Lucide icon name before the label. */
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  count: undefined,
  icon: undefined,
})

defineEmits<{ click: [event: MouseEvent] }>()

const cls = computed(() => ['rs-chip', props.active ? 'rs-chip--active' : ''])
</script>

<template>
  <button type="button" :class="cls" :aria-pressed="active" @click="$emit('click', $event)">
    <ReshakeIcon v-if="icon" :name="icon" :size="14" />
    {{ label }}
    <span v-if="count != null" class="rs-chip__count">{{ count }}</span>
  </button>
</template>
