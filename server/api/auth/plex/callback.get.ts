interface PlexPinStatus {
  id: number
  authToken: string | null
}

interface PlexAccount {
  id: number
  username: string
  email: string
  thumb: string
}

interface PlexResource {
  clientIdentifier: string
}

export default defineEventHandler(async (event) => {
  const clientId = requireEnv('PLEX_CLIENT_ID')
  const serverMachineId = requireEnv('PLEX_SERVER_MACHINE_IDENTIFIER')

  const { pinId } = getQuery(event)
  if (!pinId) {
    return sendRedirect(event, '/login?error=plex_failed')
  }

  const pin = await $fetch<PlexPinStatus>(`https://plex.tv/api/v2/pins/${pinId}`, {
    headers: { Accept: 'application/json', 'X-Plex-Client-Identifier': clientId }
  })

  if (!pin.authToken) {
    return sendRedirect(event, '/login?error=plex_failed')
  }

  const account = await $fetch<PlexAccount>('https://plex.tv/api/v2/user', {
    headers: { Accept: 'application/json', 'X-Plex-Token': pin.authToken }
  })

  const resources = await $fetch<PlexResource[]>('https://plex.tv/api/v2/resources', {
    query: { includeHttps: 1 },
    headers: { Accept: 'application/json', 'X-Plex-Token': pin.authToken }
  })

  const hasServerAccess = resources.some((resource) => resource.clientIdentifier === serverMachineId)
  if (!hasServerAccess) {
    return sendRedirect(event, '/login?error=no_access')
  }

  await setUserSession(event, {
    user: {
      id: account.id,
      username: account.username,
      email: account.email,
      thumb: account.thumb
    }
  })

  return sendRedirect(event, '/')
})
