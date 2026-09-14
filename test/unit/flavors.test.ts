import { describe, expect, it } from 'vitest'
import { FLAVORS, type Flavor } from '~/utils/flavors'

describe('FLAVORS', () => {
  const expectedFlavors: Flavor[] = ['sweet', 'sour', 'smoky', 'herbal', 'bitter', 'strong']

  it('defines exactly the six smaaktags, no more, no less', () => {
    expect(Object.keys(FLAVORS).sort()).toEqual([...expectedFlavors].sort())
  })

  it.each(expectedFlavors)('gives %s a label, nl label, family and accent', (flavor) => {
    const meta = FLAVORS[flavor]
    expect(meta.label).toBeTruthy()
    expect(meta.nl).toBeTruthy()
    expect(meta.family).toBeTruthy()
    expect(meta.accent).toBe(`var(--flavor-${flavor})`)
  })
})
