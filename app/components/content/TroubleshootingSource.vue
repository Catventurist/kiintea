<script setup lang="ts">
import { useProblems } from '~/composables/useContentCollection'

const props = withDefaults(defineProps<{
  tag?: string
  title?: string
  group?: string
}>(), { tag: undefined, title: undefined, group: 'source' })

const { items } = useProblems(() => props.tag)
</script>

<template>
  <Troubleshooting
    :group="group"
    :title="title"
    :items="items"
  />
</template>
