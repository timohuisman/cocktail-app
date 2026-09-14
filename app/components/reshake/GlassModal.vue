<script setup lang="ts">
interface Props {
  open?: boolean
  title?: string
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  open: true,
  title: undefined,
  subtitle: undefined,
})

const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <div v-if="open" class="rs-scrim" role="dialog" aria-modal="true" :aria-label="title" @click="emit('close')">
    <div class="rs-modal" @click.stop>
      <div class="rs-modal__head">
        <div style="flex: 1">
          <h3 v-if="title" class="rs-modal__title">{{ title }}</h3>
          <p v-if="subtitle" class="rs-modal__sub">{{ subtitle }}</p>
        </div>
        <ReshakeIconButton icon="x" label="Sluiten" variant="glass" @click="emit('close')" />
      </div>
      <slot />
      <div v-if="$slots.footer" class="rs-modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
