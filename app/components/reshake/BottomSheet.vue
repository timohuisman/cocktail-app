<script setup lang="ts">
interface Props {
  open?: boolean
  title?: string
}

withDefaults(defineProps<Props>(), {
  open: true,
  title: undefined,
})

const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div v-if="open" class="rs-scrim rs-scrim--bottom" role="dialog" aria-modal="true" :aria-label="title" @click="emit('close')">
    <div class="rs-sheet" @click.stop>
      <div class="rs-sheet__grip" />
      <div v-if="title" style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-md)">
        <h3 class="rs-sheet__title" style="flex: 1">{{ title }}</h3>
        <ReshakeIconButton icon="x" label="Sluiten" variant="glass" @click="emit('close')" />
      </div>
      <slot />
    </div>
  </div>
</template>
