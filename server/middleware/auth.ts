const PUBLIC_PREFIXES = ['/api/auth/', '/api/_auth/']

export default defineEventHandler(async (event) => {
  if (useRuntimeConfig(event).public.authDisabled) return
  if (!event.path.startsWith('/api/')) return
  if (PUBLIC_PREFIXES.some((prefix) => event.path.startsWith(prefix))) return

  await requireUserSession(event)
})
