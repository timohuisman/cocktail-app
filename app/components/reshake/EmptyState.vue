<script setup lang="ts">
interface Props {
  /** Lucide icon name, default "wine-off". */
  icon?: string
  title: string
  body?: string
  cta?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'wine-off',
  body: undefined,
  cta: undefined,
})

defineEmits<{ cta: [] }>()
</script>

<template>
  <div class="rs-empty">
    <ReshakeIcon v-if="icon" :name="icon" :size="28" color="var(--steel)" />
    <h4 class="rs-empty__title">{{ title }}</h4>
    <p v-if="body" class="rs-empty__body">{{ body }}</p>
    <ReshakeButton v-if="cta" variant="secondary" icon-left="plus" @click="$emit('cta')">{{ cta }}</ReshakeButton>
  </div>
</template>
