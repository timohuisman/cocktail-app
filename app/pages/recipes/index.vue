<script setup lang="ts">
interface LocalRecipe {
  id: string
  name: string
  imageUrl: string | null
}

const { data: recipes } = await useFetch<LocalRecipe[]>('/api/recipes')
</script>

<template>
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between; gap: var(--space-md)">
      <h1 class="rs-heading-1">Mijn recepten</h1>
      <ReshakeButton href="/recipes/new" icon-left="plus">Nieuw recept</ReshakeButton>
    </div>

    <ReshakeEmptyState
      v-if="!recipes?.length"
      style="margin-top: var(--space-lg)"
      icon="book-open"
      title="Nog geen eigen recepten"
      body="Voeg je eerste recept toe om het hier terug te vinden."
      cta="Nieuw recept"
      @cta="navigateTo('/recipes/new')"
    />
    <div v-else class="rs-grid" style="margin-top: var(--space-lg)">
      <CocktailCard
        v-for="r in recipes"
        :key="r.id"
        :to="`/recipes/${r.id}`"
        :name="r.name"
        :image-url="r.imageUrl"
      />
    </div>
  </div>
</template>
