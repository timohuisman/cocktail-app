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
  <div v-if="recipe" class="rs-detail-grid">
    <ReshakeMedia :src="recipe.imageUrl ?? undefined" :alt="recipe.name" ratio="1-1" />
    <div>
      <h1 class="rs-heading-1" style="margin-bottom: var(--space-xxs)">{{ recipe.name }}</h1>
      <p class="rs-body-sm rs-text-secondary" style="margin-bottom: var(--space-lg)">
        {{ [recipe.category, recipe.glass, recipe.isAlcoholic ? 'Alcoholisch' : 'Alcoholvrij'].filter(Boolean).join(' · ') }}
      </p>

      <div style="display: flex; gap: var(--space-sm); margin-bottom: var(--space-xl)">
        <ReshakeButton :variant="favorited ? 'primary' : 'secondary'" icon-left="heart" @click="onToggleFavorite">
          {{ favorited ? 'Favoriet' : 'Voeg toe aan favorieten' }}
        </ReshakeButton>
        <ReshakeButton variant="ghost" icon-left="trash-2" @click="deleteRecipe">Verwijderen</ReshakeButton>
      </div>

      <h2 class="rs-micro-uppercase rs-text-tertiary" style="margin-bottom: var(--space-sm)">Ingrediënten</h2>
      <ul class="rs-ingredient-list" style="margin-bottom: var(--space-xl)">
        <li v-for="ing in recipe.ingredients" :key="ing.id">
          {{ ing.amount ? `${ing.amount} ` : '' }}{{ ing.name }}
        </li>
      </ul>

      <h2 class="rs-micro-uppercase rs-text-tertiary" style="margin-bottom: var(--space-sm)">Instructies</h2>
      <p class="rs-body rs-text-secondary">{{ recipe.instructions }}</p>
    </div>
  </div>
</template>
