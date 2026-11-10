<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

interface KanbanCard {
  id: string
  title: string
  description?: string
  icon?: string
}

const props = defineProps<{
  id: string
  title: string
}>()

const emit = defineEmits<{
  move: [payload: { from: string, to: string, oldIndex: number, newIndex: number }]
}>()

const cards = defineModel<KanbanCard[]>('cards', { required: true })

const el = useTemplateRef<HTMLElement>('el')
let nextSibling: Node | null = null

useSortable(el, cards, {
  group: 'kanban',
  draggable: '[data-card]',
  ghostClass: 'opacity-50',
  direction: 'vertical',
  animation: 150,
  forceFallback: true,
  fallbackOnBody: true,
  fallbackTolerance: 3,
  emptyInsertThreshold: 32,
  onStart: (e) => {
    nextSibling = e.item.nextSibling
  },
  onEnd: (e) => {
    try {
      if (e.from === e.to) return

      const reference = nextSibling && nextSibling.parentNode === e.from ? nextSibling : null
      e.from.insertBefore(e.item, reference)

      const to = e.to.dataset.columnId
      const oldIndex = e.oldDraggableIndex
      const newIndex = e.newDraggableIndex
      if (!to || oldIndex == null || newIndex == null) return

      emit('move', { from: props.id, to, oldIndex, newIndex })
    } finally {
      nextSibling = null
    }
  }
})
</script>

<template>
  <div class="w-66 shrink-0 rounded-lg bg-elevated/60 p-3">
    <div class="mb-3 flex items-center justify-between font-mono">
      <span class="text-sm font-semibold">
        {{ title }}
      </span>
      <UBadge
        :label="String(cards.length)"
        color="neutral"
        variant="subtle"
        size="md"
        class="tabular-nums"
      />
    </div>

    <div
      ref="el"
      :data-column-id="id"
      class="flex min-h-24 flex-col"
    >
      <div
        v-for="card in cards"
        :key="card.id"
        data-card
        class="cursor-grab select-none py-1 active:cursor-grabbing"
      >
        <UCard :ui="{ body: 'p-3 sm:p-3' }">
          <div class="flex items-start gap-2">
            <UIcon
              v-if="card.icon"
              :name="card.icon"
              class="mt-0.5 size-4 shrink-0 text-muted"
            />
            <div>
              <p class="text-sm font-medium">
                {{ card.title }}
              </p>
              <p
                v-if="card.description"
                class="text-xs text-muted"
              >
                {{ card.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
