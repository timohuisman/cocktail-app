export default defineEventHandler(async (event) => {
  const user = await getSessionUser(event)
  const id = getRouterParam(event, 'id')
  const prisma = usePrisma()

  const { count } = await prisma.recipe.deleteMany({ where: { id, userId: user.id } })
  if (count === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Recipe not found' })
  }
  return { success: true }
})
