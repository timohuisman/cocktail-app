<script setup lang="ts">
import { useId } from 'vue'

interface Props {
  label?: string
  modelValue?: string
  placeholder?: string
  /** Helper text under the field. */
  helper?: string
  /** Error message; also switches the border to --error-700. */
  error?: string
  /** Render a textarea (min-height 96px, resizable). */
  multiline?: boolean
  disabled?: boolean
  id?: string
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  modelValue: '',
  placeholder: undefined,
  helper: undefined,
  error: undefined,
  multiline: false,
  disabled: false,
  id: undefined,
  type: 'text',
})

defineEmits<{ 'update:modelValue': [value: string] }>()

const fieldId = props.id ?? `rs-field-${useId()}`

const inputCls = computed(() => [
  'rs-input',
  props.multiline ? 'rs-input--textarea' : '',
  props.error ? 'rs-input--error' : '',
])
</script>

<template>
  <div class="rs-field">
    <label v-if="label" class="rs-label" :for="fieldId">{{ label }}</label>
    <textarea
      v-if="multiline"
      :id="fieldId"
      :class="inputCls"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="error ? true : undefined"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <input
      v-else
      :id="fieldId"
      :class="inputCls"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="error ? true : undefined"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <span v-if="error || helper" :class="['rs-helper', error ? 'rs-helper--error' : '']">{{ error || helper }}</span>
  </div>
</template>
