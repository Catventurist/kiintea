<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { useSortable, moveArrayElement, insertNodeAt, removeNode } from '@vueuse/integrations/useSortable'

interface Row {
  id: string
  name?: string
  avatar?: string
  icon?: string
  [key: string]: string | number | undefined
}

const props = defineProps<{
  columns: { key: string, label: string }[]
  data: Row[]
}>()

const UIcon = resolveComponent('UIcon')
const UAvatar = resolveComponent('UAvatar')

const rows = ref<Row[]>(props.data.map(row => ({ ...row })))
const version = ref(0)

const tableColumns = [
  {
    id: 'drag',
    header: '',
    cell: ({ row }: { row: { original: Row } }) => {
      const { avatar, icon, name } = row.original

      return h('span', {
        'data-drag-handle': '',
        'class': 'inline-flex cursor-grab active:cursor-grabbing text-muted'
      }, avatar
        ? h(UAvatar, { src: avatar, alt: String(name ?? ''), size: 'sm' })
        : h(UIcon, { name: icon ?? 'i-lucide-grip-vertical', class: 'size-5' }))
    }
  },
  ...props.columns.map(col => ({
    accessorKey: col.key,
    header: col.label
  }))
]

const table = useTemplateRef<{ $el: HTMLElement }>('table')
const el = computed(() => table.value?.$el?.querySelector('tbody') as HTMLElement | undefined)

useSortable(el, rows, {
  watchElement: true,
  handle: '[data-drag-handle]',
  draggable: 'tr',
  onUpdate: (e) => {
    const from = e.oldDraggableIndex
    const to = e.newDraggableIndex
    if (from == null || to == null) return

    removeNode(e.item)
    insertNodeAt(e.from, e.item, e.oldIndex!)
    moveArrayElement(rows, from, to, e)
  }
})

let lastOrder = rows.value.map(r => r.id).join()

watch(rows, async (val) => {
  const order = val.map(r => r?.id).join()
  if (order === lastOrder) return
  lastOrder = order
  await nextTick()
  version.value++
}, { flush: 'post' })
</script>

<template>
  <ClientOnly>
    <UTable
      :key="version"
      ref="table"
      :data="rows"
      :columns="tableColumns"
    />

    <template #fallback>
      <USkeleton class="h-32 w-full" />
    </template>
  </ClientOnly>
</template>
