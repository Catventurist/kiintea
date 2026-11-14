<script setup lang="ts">
import { useScrollReveal } from '~/composables/useReveal'

const props = withDefaults(defineProps<{
  variant?: 'emerge' | 'blur' | 'scale' | 'split'
  as?: string
  delay?: string | number
  distance?: string | number
  threshold?: string | number
}>(), {
  variant: 'emerge',
  as: 'div',
  delay: '0',
  distance: '30',
  threshold: '0.2'
})

const { visible, style } = useScrollReveal({
  delay: Number(props.delay),
  distance: Number(props.distance),
  threshold: Number(props.threshold)
})

const animClass = {
  emerge: 'animate-emerge',
  blur: 'animate-blur',
  scale: 'animate-scale',
  split: 'animate-split'
}
</script>

<template>
  <component
    :is="as"
    ref="reveal"
    :class="visible ? animClass[variant] : 'opacity-0'"
    :style="style"
  >
    <slot />
  </component>
</template>
