<script setup lang="ts">
interface ExternalDrinkDetail {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
  strInstructions: string
  strGlass: string | null
  strCategory: string | null
  strAlcoholic: string | null
  [key: string]: string | null
}

const route = useRoute()
const id = route.params.id as string

const { data: drink } = await useFetch<ExternalDrinkDetail>(`/api/cocktails/${id}`)
const { isFavorited, toggleFavorite } = useFavorites()

const ingredients = computed(() => {
  if (!drink.value) return []
  const list: { name: string; amount: string | null }[] = []
  for (let i = 1; i <= 15; i++) {
    const name = drink.value[`strIngredient${i}`]
    if (!name) continue
    list.push({ name, amount: drink.value[`strMeasure${i}`] })
  }
  return list
})

const favorited = computed(() =>
  drink.value ? isFavorited({ externalId: drink.value.idDrink }) : false
)

function onToggleFavorite() {
  if (!drink.value) return
  toggleFavorite({
    externalId: drink.value.idDrink,
    externalName: drink.value.strDrink,
    externalImageUrl: drink.value.strDrinkThumb
  })
}
</script>

<template>
  <div v-if="drink" class="rs-detail-grid">
    <ReshakeMedia :src="drink.strDrinkThumb" :alt="drink.strDrink" ratio="1-1" />
    <div>
      <h1 class="rs-heading-1" style="margin-bottom: var(--space-xxs)">{{ drink.strDrink }}</h1>
      <p class="rs-body-sm rs-text-secondary" style="margin-bottom: var(--space-lg)">
        {{ [drink.strCategory, drink.strGlass, drink.strAlcoholic].filter(Boolean).join(' · ') }}
      </p>

      <ReshakeButton
        :variant="favorited ? 'primary' : 'secondary'"
        :icon-left="favorited ? 'heart' : 'heart'"
        style="margin-bottom: var(--space-xl)"
        @click="onToggleFavorite"
      >
        {{ favorited ? 'Favoriet' : 'Voeg toe aan favorieten' }}
      </ReshakeButton>

      <h2 class="rs-micro-uppercase rs-text-tertiary" style="margin-bottom: var(--space-sm)">Ingrediënten</h2>
      <ul class="rs-ingredient-list" style="margin-bottom: var(--space-xl)">
        <li v-for="ing in ingredients" :key="ing.name">
          {{ ing.amount ? `${ing.amount} ` : '' }}{{ ing.name }}
        </li>
      </ul>

      <h2 class="rs-micro-uppercase rs-text-tertiary" style="margin-bottom: var(--space-sm)">Instructies</h2>
      <p class="rs-body rs-text-secondary">{{ drink.strInstructions }}</p>
    </div>
  </div>
</template>
