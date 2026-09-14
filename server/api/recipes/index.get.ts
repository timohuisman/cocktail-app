export default defineEventHandler(async () => {
  const prisma = usePrisma()
  return prisma.recipe.findMany({
    include: { ingredients: true },
    orderBy: { createdAt: 'desc' }
  })
})
