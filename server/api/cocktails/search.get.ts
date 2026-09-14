export default defineEventHandler(async (event) => {
  const { q = '' } = getQuery(event)
  const config = useRuntimeConfig()

  const data = await $fetch<{ drinks: any[] | null }>(`${config.cocktailDbApiBase}/search.php`, {
    query: { s: q }
  })

  return data.drinks ?? []
})
