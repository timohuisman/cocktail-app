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
    <div class="rs-page-head">
      <h1 class="rs-heading-1">Wat kan ik maken?</h1>
      <p class="rs-body rs-text-secondary">Vul de ingrediënten in die je in huis hebt, gescheiden door een komma.</p>
    </div>

    <form class="rs-form__search" style="margin-top: var(--space-lg)" @submit.prevent="search">
      <ReshakeSearchPill v-model="ingredientsInput" placeholder="bv. Vodka, Lime, Mint" full-width />
      <ReshakeButton type="submit">Zoeken</ReshakeButton>
    </form>

    <ReshakeEmptyState
      v-if="searched && !results.length"
      style="margin-top: var(--space-section-sm)"
      icon="search-x"
      title="Geen match gevonden"
      body="Geen cocktails gevonden met die combinatie van ingrediënten."
    />
    <div v-else class="rs-grid" style="margin-top: var(--space-section-sm)">
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
