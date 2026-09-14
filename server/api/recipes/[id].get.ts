export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const prisma = usePrisma()

  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: { ingredients: true }
  })

  if (!recipe) {
    throw createError({ statusCode: 404, statusMessage: 'Recipe not found' })
  }
  return recipe
})
