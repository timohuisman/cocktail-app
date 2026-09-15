interface CreateRecipeBody {
  name: string
  category?: string
  glass?: string
  instructions: string
  imageUrl?: string
  isAlcoholic?: boolean
  ingredients: { name: string; amount?: string }[]
}

export default defineEventHandler(async (event) => {
  const user = await getSessionUser(event)
  const body = await readBody<CreateRecipeBody>(event)

  if (!body?.name || !body?.instructions || !body?.ingredients?.length) {
    throw createError({ statusCode: 400, statusMessage: 'name, instructions and at least one ingredient are required' })
  }

  const prisma = usePrisma()
  return prisma.recipe.create({
    data: {
      name: body.name,
      category: body.category,
      glass: body.glass,
      instructions: body.instructions,
      imageUrl: body.imageUrl,
      isAlcoholic: body.isAlcoholic ?? true,
      userId: user.id,
      ingredients: {
        create: body.ingredients.map((i) => ({ name: i.name, amount: i.amount }))
      }
    },
    include: { ingredients: true }
  })
})
