<script setup lang="ts">
defineProps<{
  to: string
  name: string
  imageUrl?: string | null
}>()
</script>

<template>
  <NuxtLink :to="to" class="rs-recipe-card" style="text-decoration: none">
    <ReshakeMedia :src="imageUrl ?? undefined" :alt="name" />
    <span class="rs-recipe-card__title">{{ name }}</span>
  </NuxtLink>
</template>
