<script setup lang="ts">
import type { SocialUser } from '~/utils/social'

interface Props {
  user: SocialUser
  text: string
  /** Relative time, e.g. "1 u". */
  time?: string
}

withDefaults(defineProps<Props>(), {
  time: undefined,
})
</script>

<template>
  <div class="rs-comment">
    <ReshakeAvatar :name="user?.name" :src="user?.avatar" :tint="user?.tint" :size="28" />
    <div class="rs-comment__body">
      <span class="rs-comment__name">{{ user?.name }} <span class="rs-comment__time">{{ time }}</span></span>
      <span>{{ text }}</span>
    </div>
  </div>
</template>
