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
    <h1 class="mb-6 text-2xl font-semibold">Ontdek cocktails</h1>

    <form class="mb-8 flex gap-2" @submit.prevent="search">
      <input
        v-model="query"
        type="text"
        placeholder="Zoek op naam, bv. Mojito"
        class="flex-1 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm placeholder-neutral-500 focus:border-neutral-500 focus:outline-none"
      >
      <button
        type="submit"
        class="rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-neutral-200"
      >
        Zoeken
      </button>
    </form>

    <section v-if="filteredLocal.length" class="mb-10">
      <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Eigen recepten
      </h2>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <CocktailCard
          v-for="r in filteredLocal"
          :key="r.id"
          :to="`/recipes/${r.id}`"
          :name="r.name"
          :image-url="r.imageUrl"
        />
      </div>
    </section>

    <section>
      <h2 v-if="searched" class="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Resultaten
      </h2>
      <p v-if="searched && !externalResults.length" class="text-neutral-500">
        Geen cocktails gevonden voor "{{ query }}".
      </p>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
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
