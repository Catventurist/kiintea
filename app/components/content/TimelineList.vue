<script setup lang="ts">
import { useSortable, moveArrayElement, insertNodeAt, removeNode } from '@vueuse/integrations/useSortable'

interface TimelineEntry {
  title: string
  description?: string
  date?: string
  icon?: string
  avatar?: { src: string, alt?: string }
}

const props = defineProps<{
  items: TimelineEntry[]
}>()

const list = ref<TimelineEntry[]>(props.items.map(item => ({ ...item })))

const timeline = useTemplateRef<{ $el: HTMLElement }>('timeline')
const el = computed(() => timeline.value?.$el as HTMLElement | undefined)

useSortable(el, list, {
  watchElement: true,
  draggable: '[data-slot="item"]',
  handle: '[data-slot="indicator"]',
  onUpdate: (e) => {
    const from = e.oldDraggableIndex
    const to = e.newDraggableIndex
    if (from == null || to == null) return

    removeNode(e.item)
    insertNodeAt(e.from, e.item, e.oldIndex!)
    moveArrayElement(list, from, to, e)
  }
})
</script>

<template>
  <UTimeline
    ref="timeline"
    :items="list"
    :ui="{ indicator: 'cursor-grab active:cursor-grabbing' }"
  />
</template>
