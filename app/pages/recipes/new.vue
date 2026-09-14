<script setup lang="ts">
const name = ref('')
const category = ref('')
const glass = ref('')
const imageUrl = ref('')
const isAlcoholic = ref(true)
const instructions = ref('')
const ingredients = ref([{ name: '', amount: '' }])

function addIngredient() {
  ingredients.value.push({ name: '', amount: '' })
}

function removeIngredient(index: number) {
  ingredients.value.splice(index, 1)
}

const submitting = ref(false)
const error = ref('')

async function submit() {
  error.value = ''
  submitting.value = true
  try {
    const recipe = await $fetch('/api/recipes', {
      method: 'POST',
      body: {
        name: name.value,
        category: category.value || undefined,
        glass: glass.value || undefined,
        imageUrl: imageUrl.value || undefined,
        isAlcoholic: isAlcoholic.value,
        instructions: instructions.value,
        ingredients: ingredients.value.filter((i) => i.name.trim())
      }
    })
    await navigateTo(`/recipes/${recipe.id}`)
  } catch (e: any) {
    error.value = e?.data?.statusMessage ?? 'Er ging iets mis bij het opslaan.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="max-w-xl">
    <h1 class="mb-6 text-2xl font-semibold">Nieuw recept</h1>

    <form class="space-y-5" @submit.prevent="submit">
      <div>
        <label class="mb-1 block text-sm font-medium text-neutral-300">Naam</label>
        <input v-model="name" required class="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none">
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-neutral-300">Categorie</label>
          <input v-model="category" class="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none">
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-neutral-300">Glas</label>
          <input v-model="glass" class="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none">
        </div>
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-neutral-300">Afbeelding URL</label>
        <input v-model="imageUrl" class="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none">
      </div>

      <label class="flex items-center gap-2 text-sm text-neutral-300">
        <input v-model="isAlcoholic" type="checkbox" class="rounded border-neutral-700 bg-neutral-900">
        Alcoholisch
      </label>

      <div>
        <label class="mb-1 block text-sm font-medium text-neutral-300">Ingrediënten</label>
        <div v-for="(ingredient, index) in ingredients" :key="index" class="mb-2 flex gap-2">
          <input v-model="ingredient.name" placeholder="Naam" class="flex-1 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none">
          <input v-model="ingredient.amount" placeholder="Hoeveelheid" class="w-32 rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none">
          <button
            type="button"
            class="px-2 text-neutral-500 hover:text-white"
            :disabled="ingredients.length === 1"
            @click="removeIngredient(index)"
          >
            ✕
          </button>
        </div>
        <button type="button" class="text-sm text-neutral-400 hover:text-white" @click="addIngredient">
          + Ingrediënt toevoegen
        </button>
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-neutral-300">Instructies</label>
        <textarea v-model="instructions" required rows="4" class="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none" />
      </div>

      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>

      <button
        type="submit"
        :disabled="submitting"
        class="rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-neutral-200 disabled:opacity-50"
      >
        {{ submitting ? 'Opslaan...' : 'Recept opslaan' }}
      </button>
    </form>
  </div>
</template>
