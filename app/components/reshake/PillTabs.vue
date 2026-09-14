<script setup lang="ts">
export type PillTabItem = string | { id: string; label: string }

interface Props {
  /** Strings, or objects with id + label. */
  items: PillTabItem[]
  activeId?: string
}

withDefaults(defineProps<Props>(), {
  activeId: undefined,
})

defineEmits<{ change: [id: string] }>()

const idOf = (it: PillTabItem) => (typeof it === 'string' ? it : it.id)
const labelOf = (it: PillTabItem) => (typeof it === 'string' ? it : it.label)
</script>

<template>
  <div class="rs-pill-tabs" role="tablist">
    <button
      v-for="it in items"
      :key="idOf(it)"
      type="button"
      role="tab"
      :aria-selected="idOf(it) === activeId"
      :class="['rs-pill-tab', idOf(it) === activeId ? 'rs-pill-tab--active' : '']"
      @click="$emit('change', idOf(it))"
    >
      {{ labelOf(it) }}
    </button>
  </div>
</template>
