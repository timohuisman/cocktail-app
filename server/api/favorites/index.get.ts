export default defineEventHandler(async (event) => {
  const user = await getSessionUser(event)
  const prisma = usePrisma()
  return prisma.favorite.findMany({
    where: { userId: user.id },
    include: { recipe: { include: { ingredients: true } } },
    orderBy: { createdAt: 'desc' }
  })
})
