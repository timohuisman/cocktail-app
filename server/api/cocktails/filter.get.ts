export default defineEventHandler(async (event) => {
  const { ingredient = '' } = getQuery(event)
  const config = useRuntimeConfig()

  const data = await $fetch<{ drinks: any[] | null }>(`${config.cocktailDbApiBase}/filter.php`, {
    query: { i: ingredient }
  })

  return data.drinks ?? []
})
