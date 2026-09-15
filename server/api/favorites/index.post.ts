interface CreateFavoriteBody {
  recipeId?: string
  externalId?: string
  externalName?: string
  externalImageUrl?: string
}

export default defineEventHandler(async (event) => {
  const user = await getSessionUser(event)
  const body = await readBody<CreateFavoriteBody>(event)

  if (!body?.recipeId && !body?.externalId) {
    throw createError({ statusCode: 400, statusMessage: 'recipeId or externalId is required' })
  }

  const prisma = usePrisma()
  return prisma.favorite.create({
    data: {
      recipeId: body.recipeId,
      externalId: body.externalId,
      externalName: body.externalName,
      externalImageUrl: body.externalImageUrl,
      userId: user.id
    }
  })
})
