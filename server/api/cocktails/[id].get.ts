export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const config = useRuntimeConfig()

  const data = await $fetch<{ drinks: any[] | null }>(`${config.cocktailDbApiBase}/lookup.php`, {
    query: { i: id }
  })

  const drink = data.drinks?.[0]
  if (!drink) {
    throw createError({ statusCode: 404, statusMessage: 'Cocktail not found' })
  }
  return drink
})
