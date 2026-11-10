<script setup lang="ts">
import { useSortable, moveArrayElement, insertNodeAt, removeNode } from '@vueuse/integrations/useSortable'

const props = defineProps<{
  items?: string[]
  placeholder?: string
}>()

const tags = ref<string[]>([...(props.items ?? [])])

const input = useTemplateRef<{ $el: HTMLElement }>('input')
const el = computed(() => input.value?.$el as HTMLElement | undefined)

useSortable(el, tags, {
  watchElement: true,
  draggable: '[data-slot="item"]',
  filter: 'button',
  preventOnFilter: false,
  onUpdate: (e) => {
    const from = e.oldDraggableIndex
    const to = e.newDraggableIndex
    if (from == null || to == null) return

    removeNode(e.item)
    insertNodeAt(e.from, e.item, e.oldIndex!)
    moveArrayElement(tags, from, to, e)
  }
})

const id = useId()
</script>

<template>
  <UInputTags
    :id="id"
    ref="input"
    v-model="tags"
    name="tags"
    :placeholder="placeholder"
    :ui="{ item: 'cursor-grab active:cursor-grabbing' }"
    class="w-full"
  />
</template>
