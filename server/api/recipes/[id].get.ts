export default defineEventHandler(async (event) => {
  const user = await getSessionUser(event)
  const id = getRouterParam(event, 'id')
  const prisma = usePrisma()

  const recipe = await prisma.recipe.findUnique({
    where: { id, userId: user.id },
    include: { ingredients: true }
  })

  if (!recipe) {
    throw createError({ statusCode: 404, statusMessage: 'Recipe not found' })
  }
  return recipe
})
