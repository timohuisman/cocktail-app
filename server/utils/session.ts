// Memoized so concurrent requests (the app fires several API calls in
// parallel on page load) await the same upsert instead of racing each
// other into a unique constraint violation on `plexId`.
let devUserPromise: ReturnType<typeof createDevUser> | undefined

function createDevUser() {
  return usePrisma().user.upsert({
    where: { plexId: 0 },
    update: {},
    create: { plexId: 0, username: 'Dev', email: null, thumb: null }
  })
}

export async function getSessionUser(event: H3Event) {
  if (useRuntimeConfig(event).public.authDisabled) {
    if (!devUserPromise) devUserPromise = createDevUser()
    return devUserPromise
  }

  const { user } = await requireUserSession(event)
  return user
}
