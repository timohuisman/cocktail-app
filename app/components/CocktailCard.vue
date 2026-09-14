<script setup lang="ts">
defineProps<{
  to: string
  name: string
  imageUrl?: string | null
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="group overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 transition hover:border-neutral-600"
  >
    <div class="aspect-square bg-neutral-800">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="name"
        class="h-full w-full object-cover transition group-hover:scale-105"
      >
    </div>
    <p class="truncate p-3 text-sm font-medium">{{ name }}</p>
  </NuxtLink>
</template>
