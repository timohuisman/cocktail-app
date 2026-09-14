<script setup lang="ts">
interface LocalRecipeDetail {
  id: string
  name: string
  category: string | null
  glass: string | null
  instructions: string
  imageUrl: string | null
  isAlcoholic: boolean
  ingredients: { id: string; name: string; amount: string | null }[]
}

const route = useRoute()
const id = route.params.id as string

const { data: recipe } = await useFetch<LocalRecipeDetail>(`/api/recipes/${id}`)
const { isFavorited, toggleFavorite } = useFavorites()

const favorited = computed(() =>
  recipe.value ? isFavorited({ recipeId: recipe.value.id }) : false
)

function onToggleFavorite() {
  if (!recipe.value) return
  toggleFavorite({ recipeId: recipe.value.id })
}

async function deleteRecipe() {
  if (!recipe.value) return
  if (!confirm(`"${recipe.value.name}" verwijderen?`)) return
  await $fetch(`/api/recipes/${recipe.value.id}`, { method: 'DELETE' })
  await navigateTo('/recipes')
}
</script>

<template>
  <div v-if="recipe" class="grid gap-8 md:grid-cols-2">
    <img v-if="recipe.imageUrl" :src="recipe.imageUrl" :alt="recipe.name" class="w-full rounded-lg">
    <div>
      <h1 class="mb-2 text-2xl font-semibold">{{ recipe.name }}</h1>
      <p class="mb-4 text-sm text-neutral-400">
        {{ recipe.category }} · {{ recipe.glass }} · {{ recipe.isAlcoholic ? 'Alcoholisch' : 'Alcoholvrij' }}
      </p>

      <div class="mb-6 flex gap-2">
        <button
          class="rounded-md border px-4 py-2 text-sm font-medium"
          :class="favorited
            ? 'border-white bg-white text-neutral-950'
            : 'border-neutral-700 text-neutral-200 hover:border-neutral-500'"
          @click="onToggleFavorite"
        >
          {{ favorited ? '★ Favoriet' : '☆ Toevoegen aan favorieten' }}
        </button>
        <button
          class="rounded-md border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-400 hover:border-red-500 hover:text-red-400"
          @click="deleteRecipe"
        >
          Verwijderen
        </button>
      </div>

      <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Ingrediënten
      </h2>
      <ul class="mb-6 space-y-1 text-sm text-neutral-200">
        <li v-for="ing in recipe.ingredients" :key="ing.id">
          {{ ing.amount ? `${ing.amount} ` : '' }}{{ ing.name }}
        </li>
      </ul>

      <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Instructies
      </h2>
      <p class="text-sm leading-relaxed text-neutral-200">{{ recipe.instructions }}</p>
    </div>
  </div>
</template>
