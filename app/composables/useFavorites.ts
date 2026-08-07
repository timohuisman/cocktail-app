interface Favorite {
  id: string
  recipeId: string | null
  externalId: string | null
  externalName: string | null
  externalImageUrl: string | null
  recipe?: { id: string; name: string; imageUrl: string | null } | null
}

export function useFavorites() {
  const { data: favorites, refresh } = useFetch<Favorite[]>('/api/favorites')

  function findFavorite(params: { recipeId?: string; externalId?: string }) {
    return favorites.value?.find((f) =>
      params.recipeId ? f.recipeId === params.recipeId : f.externalId === params.externalId
    )
  }

  function isFavorited(params: { recipeId?: string; externalId?: string }) {
    return Boolean(findFavorite(params))
  }

  async function toggleFavorite(params: {
    recipeId?: string
    externalId?: string
    externalName?: string
    externalImageUrl?: string
  }) {
    const existing = findFavorite(params)
    if (existing) {
      await $fetch(`/api/favorites/${existing.id}`, { method: 'DELETE' })
    } else {
      await $fetch('/api/favorites', { method: 'POST', body: params })
    }
    await refresh()
  }

  return { favorites, refresh, isFavorited, toggleFavorite }
}
