<script setup lang="ts">
const { favorites, refresh } = useFavorites()

async function removeFavorite(id: string) {
  await $fetch(`/api/favorites/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div>
    <div class="rs-page-head">
      <h1 class="rs-heading-1">Favorieten</h1>
      <p class="rs-body rs-text-secondary">Cocktails en recepten die je hebt opgeslagen.</p>
    </div>

    <ReshakeEmptyState
      v-if="!favorites?.length"
      style="margin-top: var(--space-lg)"
      icon="heart"
      title="Nog geen favorieten"
      body="Voeg een cocktail of recept toe aan je favorieten en je vindt ze hier terug."
    />
    <div v-else class="rs-grid" style="margin-top: var(--space-lg)">
      <div v-for="f in favorites" :key="f.id" style="position: relative">
        <CocktailCard
          :to="f.recipeId ? `/recipes/${f.recipeId}` : `/cocktails/${f.externalId}`"
          :name="f.recipe?.name ?? f.externalName ?? 'Onbekend'"
          :image-url="f.recipe?.imageUrl ?? f.externalImageUrl"
        />
        <ReshakeIconButton
          label="Verwijder uit favorieten"
          icon="x"
          size="md"
          style="position: absolute; top: var(--space-xs); right: var(--space-xs)"
          @click="removeFavorite(f.id)"
        />
      </div>
    </div>
  </div>
</template>
