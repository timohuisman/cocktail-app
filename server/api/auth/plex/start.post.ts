interface PlexPin {
  id: number
  code: string
}

export default defineEventHandler(async (event) => {
  const clientId = requireEnv('PLEX_CLIENT_ID')
  const appUrl = requireEnv('PLEX_APP_URL')

  const pin = await $fetch<PlexPin>('https://plex.tv/api/v2/pins', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    query: {
      strong: true,
      'X-Plex-Product': 'Cocktail App',
      'X-Plex-Client-Identifier': clientId
    }
  })

  const forwardUrl = `${appUrl}/api/auth/plex/callback?pinId=${pin.id}`
  const authUrl = new URL('https://app.plex.tv/auth')
  authUrl.hash = new URLSearchParams({
    clientID: clientId,
    code: pin.code,
    forwardUrl,
    'context[device][product]': 'Cocktail App'
  }).toString()

  return { authUrl: authUrl.toString() }
})
