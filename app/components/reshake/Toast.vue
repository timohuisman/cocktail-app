<script setup lang="ts">
interface Props {
  message: string
  /** Lucide icon name, default "check". */
  icon?: string | null
  /** Optional underlined action label. */
  action?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'check',
  action: undefined,
})

defineEmits<{ action: [] }>()
</script>

<template>
  <div class="rs-toast" role="status">
    <ReshakeIcon v-if="icon" :name="icon" :size="16" :stroke-width="2.25" />
    {{ message }}
    <button v-if="action" type="button" class="rs-toast__action" @click="$emit('action')">{{ action }}</button>
  </div>
</template>
