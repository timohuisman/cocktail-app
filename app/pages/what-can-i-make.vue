<script setup lang="ts">
interface ExternalDrink {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}

const ingredientsInput = ref('')
const searched = ref(false)
const results = ref<ExternalDrink[]>([])

async function search() {
  const ingredients = ingredientsInput.value
    .split(',')
    .map((i) => i.trim())
    .filter(Boolean)

  if (!ingredients.length) return
  searched.value = true

  const resultsPerIngredient = await Promise.all(
    ingredients.map((ingredient) =>
      $fetch<ExternalDrink[]>('/api/cocktails/filter', { query: { ingredient } })
    )
  )

  // Only keep cocktails that appear for every ingredient the user has.
  const [first, ...rest] = resultsPerIngredient
  results.value = (first ?? []).filter((drink) =>
    rest.every((list) => list.some((d) => d.idDrink === drink.idDrink))
  )
}
</script>

<template>
  <div>
    <h1 class="mb-2 text-2xl font-semibold">Wat kan ik maken?</h1>
    <p class="mb-6 text-sm text-neutral-400">
      Vul de ingrediënten in die je in huis hebt, gescheiden door een komma.
    </p>

    <form class="mb-8 flex gap-2" @submit.prevent="search">
      <input
        v-model="ingredientsInput"
        type="text"
        placeholder="bv. Vodka, Lime, Mint"
        class="flex-1 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm placeholder-neutral-500 focus:border-neutral-500 focus:outline-none"
      >
      <button
        type="submit"
        class="rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-neutral-200"
      >
        Zoeken
      </button>
    </form>

    <p v-if="searched && !results.length" class="text-neutral-500">
      Geen cocktails gevonden met die combinatie van ingrediënten.
    </p>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      <CocktailCard
        v-for="d in results"
        :key="d.idDrink"
        :to="`/cocktails/${d.idDrink}`"
        :name="d.strDrink"
        :image-url="d.strDrinkThumb"
      />
    </div>
  </div>
</template>
