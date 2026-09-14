<script setup lang="ts">
interface Props {
  modelValue?: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: undefined,
})

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="rs-topbar">
    <ReshakeSearchPill
      :model-value="modelValue"
      :placeholder="placeholder"
      full-width
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <slot />
  </div>
</template>
