<script setup lang="ts">
const { favorites, refresh } = useFavorites()

async function removeFavorite(id: string) {
  await $fetch(`/api/favorites/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-semibold">Favorieten</h1>

    <p v-if="!favorites?.length" class="text-neutral-500">
      Je hebt nog geen favorieten toegevoegd.
    </p>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      <div v-for="f in favorites" :key="f.id" class="relative">
        <CocktailCard
          :to="f.recipeId ? `/recipes/${f.recipeId}` : `/cocktails/${f.externalId}`"
          :name="f.recipe?.name ?? f.externalName ?? 'Onbekend'"
          :image-url="f.recipe?.imageUrl ?? f.externalImageUrl"
        />
        <button
          class="absolute right-2 top-2 rounded-full bg-neutral-950/80 px-2 py-1 text-xs text-neutral-300 hover:text-white"
          @click="removeFavorite(f.id)"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>
