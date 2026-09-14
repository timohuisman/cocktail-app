import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import FlavorBadge from '~/components/reshake/FlavorBadge.vue'

describe('FlavorBadge', () => {
  it('renders the default English label for a flavor', async () => {
    const wrapper = await mountSuspended(FlavorBadge, { props: { flavor: 'sour' } })
    expect(wrapper.text()).toBe('Sour')
    expect(wrapper.classes()).toContain('rs-badge--sour')
  })

  it('renders a custom label when provided', async () => {
    const wrapper = await mountSuspended(FlavorBadge, { props: { flavor: 'bitter', label: 'Bitter' } })
    expect(wrapper.text()).toBe('Bitter')
  })

  it('shows a dot only when the dot prop is set', async () => {
    const withoutDot = await mountSuspended(FlavorBadge, { props: { flavor: 'smoky' } })
    expect(withoutDot.find('.rs-badge__dot').exists()).toBe(false)

    const withDot = await mountSuspended(FlavorBadge, { props: { flavor: 'smoky', dot: true } })
    expect(withDot.find('.rs-badge__dot').exists()).toBe(true)
  })
})
