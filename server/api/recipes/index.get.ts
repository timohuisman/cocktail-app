export default defineEventHandler(async (event) => {
  const user = await getSessionUser(event)
  const prisma = usePrisma()
  return prisma.recipe.findMany({
    where: { userId: user.id },
    include: { ingredients: true },
    orderBy: { createdAt: 'desc' }
  })
})
