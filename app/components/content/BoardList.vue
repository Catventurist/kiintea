<script setup lang="ts">
interface KanbanCard {
  id: string
  title: string
  description?: string
  icon?: string
}

interface KanbanColumn {
  id: string
  title: string
  cards?: KanbanCard[]
}

const props = defineProps<{
  columns: KanbanColumn[]
}>()

const board = ref(props.columns.map(column => ({
  id: column.id,
  title: column.title,
  cards: (column.cards ?? []).map(card => ({ ...card }))
})))

function move(payload: { from: string, to: string, oldIndex: number, newIndex: number }) {
  const source = board.value.find(column => column.id === payload.from)
  const target = board.value.find(column => column.id === payload.to)
  if (!source || !target) return

  const [card] = source.cards.splice(payload.oldIndex, 1)
  if (!card) return
  target.cards.splice(payload.newIndex, 0, card)
}
</script>

<template>
  <div class="flex gap-4 overflow-x-auto pb-2">
    <KanbanColumn
      v-for="column in board"
      :id="column.id"
      :key="column.id"
      v-model:cards="column.cards"
      :title="column.title"
      @move="move"
    />
  </div>
</template>
