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
  <div>
    <h1 class="rs-heading-1" style="margin-bottom: var(--space-lg)">Nieuw recept</h1>

    <form class="rs-form" @submit.prevent="submit">
      <ReshakeTextInput v-model="name" label="Naam" required />

      <div class="rs-form__row">
        <ReshakeTextInput v-model="category" label="Categorie" />
        <ReshakeTextInput v-model="glass" label="Glas" />
      </div>

      <ReshakeTextInput v-model="imageUrl" label="Afbeelding URL" />

      <label style="display: flex; align-items: center; gap: var(--space-xs); font: var(--type-body-sm); color: var(--ink)">
        <input v-model="isAlcoholic" type="checkbox">
        Alcoholisch
      </label>

      <div class="rs-field">
        <span class="rs-label">Ingrediënten</span>
        <div v-for="(ingredient, index) in ingredients" :key="index" style="display: flex; gap: var(--space-xs); align-items: center">
          <input v-model="ingredient.name" placeholder="Naam" class="rs-input" style="flex: 1">
          <input v-model="ingredient.amount" placeholder="Hoeveelheid" class="rs-input" style="width: 128px">
          <ReshakeIconButton label="Verwijder ingrediënt" icon="x" :disabled="ingredients.length === 1" @click="removeIngredient(index)" />
        </div>
        <div>
          <ReshakeButton variant="ghost" icon-left="plus" type="button" @click="addIngredient">Ingrediënt toevoegen</ReshakeButton>
        </div>
      </div>

      <ReshakeTextInput v-model="instructions" label="Instructies" multiline required />

      <p v-if="error" class="rs-body-sm" style="color: var(--error-700)">{{ error }}</p>

      <div>
        <ReshakeButton type="submit" :disabled="submitting">
          {{ submitting ? 'Opslaan…' : 'Recept opslaan' }}
        </ReshakeButton>
      </div>
    </form>
  </div>
</template>
