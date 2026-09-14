<script setup lang="ts">
interface Props {
  modelValue?: string
  placeholder?: string
  /** default = surface fill; glass = frosted, for use inside a sticky top bar. */
  variant?: 'default' | 'glass'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Zoek een cocktail of fles',
  variant: 'default',
  fullWidth: false,
})

defineEmits<{ 'update:modelValue': [value: string] }>()

const cls = computed(() => ['rs-search', props.variant === 'glass' ? 'rs-search--glass' : '', props.fullWidth ? 'rs-search--full' : ''])
</script>

<template>
  <div :class="cls">
    <ReshakeIcon name="search" :size="16" color="var(--icon-quiet)" />
    <input
      class="rs-search__input"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <slot name="trailing" />
  </div>
</template>
