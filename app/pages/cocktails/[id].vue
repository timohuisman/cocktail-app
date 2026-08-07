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
  <div v-if="drink" class="grid gap-8 md:grid-cols-2">
    <img :src="drink.strDrinkThumb" :alt="drink.strDrink" class="w-full rounded-lg">
    <div>
      <h1 class="mb-2 text-2xl font-semibold">{{ drink.strDrink }}</h1>
      <p class="mb-4 text-sm text-neutral-400">
        {{ drink.strCategory }} · {{ drink.strGlass }} · {{ drink.strAlcoholic }}
      </p>

      <button
        class="mb-6 rounded-md border px-4 py-2 text-sm font-medium"
        :class="favorited
          ? 'border-white bg-white text-neutral-950'
          : 'border-neutral-700 text-neutral-200 hover:border-neutral-500'"
        @click="onToggleFavorite"
      >
        {{ favorited ? '★ Favoriet' : '☆ Toevoegen aan favorieten' }}
      </button>

      <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Ingrediënten
      </h2>
      <ul class="mb-6 space-y-1 text-sm text-neutral-200">
        <li v-for="ing in ingredients" :key="ing.name">
          {{ ing.amount ? `${ing.amount} ` : '' }}{{ ing.name }}
        </li>
      </ul>

      <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Instructies
      </h2>
      <p class="text-sm leading-relaxed text-neutral-200">{{ drink.strInstructions }}</p>
    </div>
  </div>
</template>
