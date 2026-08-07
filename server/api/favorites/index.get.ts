export default defineEventHandler(async () => {
  const prisma = usePrisma()
  return prisma.favorite.findMany({
    include: { recipe: { include: { ingredients: true } } },
    orderBy: { createdAt: 'desc' }
  })
})
