<script setup lang="ts">
import { useSortable, moveArrayElement, insertNodeAt, removeNode } from '@vueuse/integrations/useSortable'

interface SortableTab {
  label: string
  content: string
  icon?: string
  value: string
}

const props = defineProps<{
  items: (Omit<SortableTab, 'value'> & { value?: string })[]
}>()

const list = ref<SortableTab[]>(
  props.items.map((item, i) => ({ ...item, value: item.value ?? String(i) }))
)
const active = ref<string | undefined>(list.value[0]?.value)
const current = computed(() => list.value.find(i => i?.value === active.value))
const version = ref(0)

const tabs = useTemplateRef<{ $el: HTMLElement }>('tabs')
const el = computed(() => tabs.value?.$el?.querySelector('[role="tablist"]') as HTMLElement | undefined)

useSortable(el, list, {
  watchElement: true,
  draggable: '[data-slot="trigger"]',
  onUpdate: (e) => {
    const from = e.oldDraggableIndex
    const to = e.newDraggableIndex
    if (from == null || to == null) return

    removeNode(e.item)
    insertNodeAt(e.from, e.item, e.oldIndex!)
    moveArrayElement(list, from, to, e)
  }
})

let lastOrder = list.value.map(i => i.value).join()

watch(list, async (val) => {
  const order = val.map(i => i?.value).join()
  if (order === lastOrder) return
  lastOrder = order
  await nextTick()
  version.value++
}, { flush: 'post' })
</script>

<template>
  <div>
    <UTabs
      :key="version"
      ref="tabs"
      v-model="active"
      :items="list"
      :content="false"
      :ui="{ trigger: 'cursor-grab active:cursor-grabbing' }"
    />
    <p
      v-if="current"
      class="mt-4 text-sm"
    >
      {{ current.content }}
    </p>
  </div>
</template>
