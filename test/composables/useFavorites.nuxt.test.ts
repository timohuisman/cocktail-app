import { defineComponent, ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { readBody } from 'h3'
import { useFavorites } from '~/composables/useFavorites'

const existingFavorite = {
  id: 'fav-1',
  recipeId: 'recipe-1',
  externalId: null,
  externalName: null,
  externalImageUrl: null
}

const refresh = vi.fn()

mockNuxtImport('useFetch', () => {
  return () => ({ data: ref([existingFavorite]), refresh })
})

async function setup() {
  return mountSuspended(
    defineComponent({
      setup() {
        return useFavorites()
      },
      template: '<div />'
    })
  )
}

describe('useFavorites', () => {
  it('recognises an already-favorited recipe', async () => {
    const wrapper = await setup()
    expect(wrapper.vm.isFavorited({ recipeId: 'recipe-1' })).toBe(true)
    expect(wrapper.vm.isFavorited({ recipeId: 'some-other-recipe' })).toBe(false)
  })

  it('recognises an already-favorited external cocktail', async () => {
    const wrapper = await setup()
    expect(wrapper.vm.isFavorited({ externalId: 'ext-1' })).toBe(false)
  })

  it('removes an existing favorite via DELETE when toggled', async () => {
    refresh.mockClear()
    let deleteCalled = false
    registerEndpoint('/api/favorites/fav-1', {
      method: 'DELETE',
      handler: () => {
        deleteCalled = true
        return { success: true }
      }
    })

    const wrapper = await setup()
    await wrapper.vm.toggleFavorite({ recipeId: 'recipe-1' })

    expect(deleteCalled).toBe(true)
    expect(refresh).toHaveBeenCalled()
  })

  it('creates a new favorite via POST when toggled', async () => {
    refresh.mockClear()
    let receivedBody: unknown
    registerEndpoint('/api/favorites', {
      method: 'POST',
      handler: async (event) => {
        receivedBody = await readBody(event)
        return { id: 'fav-2' }
      }
    })

    const wrapper = await setup()
    await wrapper.vm.toggleFavorite({ recipeId: 'recipe-2' })

    expect(receivedBody).toEqual({ recipeId: 'recipe-2' })
    expect(refresh).toHaveBeenCalled()
  })
})
