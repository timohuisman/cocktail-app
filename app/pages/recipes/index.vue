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
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Mijn recepten</h1>
      <NuxtLink
        to="/recipes/new"
        class="rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-neutral-200"
      >
        + Nieuw recept
      </NuxtLink>
    </div>

    <p v-if="!recipes?.length" class="text-neutral-500">
      Je hebt nog geen eigen recepten toegevoegd.
    </p>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
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
