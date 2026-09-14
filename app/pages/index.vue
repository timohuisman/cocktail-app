<script setup lang="ts">
interface ExternalDrink {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
}

interface LocalRecipe {
  id: string
  name: string
  imageUrl: string | null
}

const query = ref('')
const searched = ref(false)
const externalResults = ref<ExternalDrink[]>([])
const { data: localRecipes } = await useFetch<LocalRecipe[]>('/api/recipes')

const filteredLocal = computed(() => {
  if (!query.value) return []
  return (localRecipes.value ?? []).filter((r) =>
    r.name.toLowerCase().includes(query.value.toLowerCase())
  )
})

async function search() {
  searched.value = true
  externalResults.value = await $fetch<ExternalDrink[]>('/api/cocktails/search', {
    query: { q: query.value }
  })
}
</script>

<template>
  <div>
    <div class="rs-page-head">
      <h1 class="rs-heading-1">Ontdek cocktails</h1>
      <p class="rs-body rs-text-secondary">Zoek op naam en bekijk het recept.</p>
    </div>

    <form class="rs-form__search" style="margin-top: var(--space-lg)" @submit.prevent="search">
      <ReshakeSearchPill v-model="query" placeholder="Zoek op naam, bv. Mojito" full-width />
      <ReshakeButton type="submit">Zoeken</ReshakeButton>
    </form>

    <section v-if="filteredLocal.length" style="margin-top: var(--space-section-sm)">
      <h2 class="rs-micro-uppercase rs-text-tertiary" style="margin-bottom: var(--space-sm)">Eigen recepten</h2>
      <div class="rs-grid">
        <CocktailCard
          v-for="r in filteredLocal"
          :key="r.id"
          :to="`/recipes/${r.id}`"
          :name="r.name"
          :image-url="r.imageUrl"
        />
      </div>
    </section>

    <section style="margin-top: var(--space-section-sm)">
      <h2 v-if="searched" class="rs-micro-uppercase rs-text-tertiary" style="margin-bottom: var(--space-sm)">Resultaten</h2>
      <ReshakeEmptyState
        v-if="searched && !externalResults.length"
        icon="search-x"
        title="Geen cocktails gevonden"
        :body='`Er zijn geen cocktails gevonden voor "${query}".`'
      />
      <div v-else class="rs-grid">
        <CocktailCard
          v-for="d in externalResults"
          :key="d.idDrink"
          :to="`/cocktails/${d.idDrink}`"
          :name="d.strDrink"
          :image-url="d.strDrinkThumb"
        />
      </div>
    </section>
  </div>
</template>
