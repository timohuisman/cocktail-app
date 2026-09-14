/* The six smaaktags map 1:1 to the six pastel families. Never add a seventh. */
export type Flavor = 'sweet' | 'sour' | 'smoky' | 'herbal' | 'bitter' | 'strong'

export const FLAVORS: Record<Flavor, { label: string; nl: string; family: string; accent: string }> = {
  sweet: { label: 'Sweet', nl: 'Zoet', family: 'blush', accent: 'var(--flavor-sweet)' },
  sour: { label: 'Sour', nl: 'Zuur', family: 'mint', accent: 'var(--flavor-sour)' },
  smoky: { label: 'Smoky', nl: 'Rokerig', family: 'citrus', accent: 'var(--flavor-smoky)' },
  herbal: { label: 'Herbal', nl: 'Kruidig', family: 'sky', accent: 'var(--flavor-herbal)' },
  bitter: { label: 'Bitter', nl: 'Bitter', family: 'grape', accent: 'var(--flavor-bitter)' },
  strong: { label: 'Strong', nl: 'Sterk', family: 'coral', accent: 'var(--flavor-strong)' },
}
