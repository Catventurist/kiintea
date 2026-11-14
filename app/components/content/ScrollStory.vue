<script setup lang="ts">
import { useScrollyStory } from '~/composables/useReveal'

withDefaults(defineProps<{
  dark?: string
  light?: string
}>(), {
  dark: '/catdark.webp',
  light: '/catlight.webp'
})

const { progress } = useScrollyStory()
</script>

<template>
  <div
    ref="scrolly"
    class="relative"
  >
    <UProgress
      :model-value="progress * 100"
      size="sm"
      class="sticky top-2 z-40"
    />

    <div class="grid relative gap-6 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
      <UCard class="sticky top-[calc(var(--ui-header-height)+2.5rem)] z-30 h-[32dvh] overflow-hidden lg:top-[calc(var(--ui-header-height)+2rem)] lg:h-[60dvh]">
        <img
          :src="dark"
          alt=""
          class="absolute inset-0 h-full w-full object-cover object-top"
          :style="{ opacity: progress }"
        >
        <img
          :src="light"
          alt=""
          class="absolute inset-0 h-full w-full object-cover object-top"
          :style="{ opacity: 1 - progress }"
        >
      </UCard>

      <div
        ref="steps"
        class="py-[10dvh] text-xl text-primary md:text-3xl [&_p]:flex [&_p]:min-h-[50dvh] [&_p]:items-center md:[&_p]:min-h-[60dvh]"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
