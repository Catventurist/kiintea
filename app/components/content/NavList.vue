<script setup lang="ts">
import { useSortable, moveArrayElement, insertNodeAt, removeNode } from '@vueuse/integrations/useSortable'

interface NavEntry {
  label: string
  icon?: string
  to?: string
  badge?: string | number
}

const props = defineProps<{
  items: NavEntry[]
  orientation?: 'horizontal' | 'vertical'
}>()

const list = ref<NavEntry[]>(props.items.map(item => ({ ...item })))

const wrapper = useTemplateRef<HTMLElement>('wrapper')
const el = computed(() => wrapper.value?.querySelector('[data-slot="list"]') as HTMLElement | null | undefined)

useSortable(el, list, {
  watchElement: true,
  draggable: '[data-slot="item"]',
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
  <div ref="wrapper">
    <UNavigationMenu
      :items="list"
      :orientation="orientation ?? 'vertical'"
      :ui="{ item: 'cursor-grab active:cursor-grabbing' }"
    />
  </div>
</template>
