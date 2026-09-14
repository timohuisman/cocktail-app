<script setup lang="ts">
/* Lucide is a substitution: the Reshake brief specifies no icon set. Loaded from
   CDN, rendered as inline SVG so it survives export/print. See design-system
   readme → Iconography. */
interface Props {
  /** Lucide icon name in kebab-case, e.g. "martini", "glass-water", "shopping-basket". */
  name: string
  /** Pixel box, default 20. */
  size?: number
  /** Stroke width, default 1.75 (Reshake's lighter-than-default line). */
  strokeWidth?: number
  /** Stroke colour, default currentColor. */
  color?: string
  /** Accessible name; omit for decorative icons (rendered aria-hidden). */
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 20,
  strokeWidth: 1.75,
  color: 'currentColor',
  title: undefined,
})

const LUCIDE_SRC = 'https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js'
let pending: Promise<void> | null = null

function ensureLucide(): Promise<void> | null {
  if (typeof window === 'undefined' || (window as any).lucide) return null
  if (!pending) {
    pending = new Promise((resolve) => {
      const existing = document.querySelector('script[data-rs-lucide]')
      if (existing) {
        existing.addEventListener('load', () => resolve())
        return
      }
      const s = document.createElement('script')
      s.src = LUCIDE_SRC
      s.async = true
      s.dataset.rsLucide = '1'
      s.onload = () => resolve()
      s.onerror = () => resolve()
      document.head.appendChild(s)
    })
  }
  return pending
}

const toPascal = (name: string) =>
  String(name)
    .split(/[-_\s]+/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('')

const tick = ref(0)

const shape = computed<Array<[string, Record<string, string>]> | null>(() => {
  tick.value
  const set = typeof window !== 'undefined' && (window as any).lucide ? (window as any).lucide.icons : null
  return set ? set[toPascal(props.name)] ?? null : null
})

onMounted(() => {
  if (typeof window !== 'undefined' && (window as any).lucide) {
    tick.value++
    return
  }
  ensureLucide()?.then(() => {
    tick.value++
  })
})

watch(
  () => props.name,
  () => {
    tick.value++
  },
)
</script>

<template>
  <svg
    class="rs-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    fill="none"
    :stroke="color"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    :aria-hidden="title ? undefined : 'true'"
    :role="title ? 'img' : undefined"
    style="flex: 0 0 auto; display: block"
  >
    <title v-if="title">{{ title }}</title>
    <component :is="entry[0]" v-for="(entry, i) in shape" :key="i" v-bind="entry[1]" />
  </svg>
</template>
