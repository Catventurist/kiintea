<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

const props = defineProps<{
  rowKey: string
  label: string
  color?: string
  group: string
  sortable?: boolean
  icons?: Record<string, string | undefined>
}>()

const emit = defineEmits<{
  move: [from: string, to: string, oldIndex: number, newIndex: number]
}>()

const model = defineModel<string[]>({ required: true })
const el = useTemplateRef<HTMLElement>('el')

useSortable(el, model, {
  group: props.group,
  animation: 150,
  disabled: !props.sortable,
  onEnd(evt) {
    const to = evt.to.dataset.row
    const { oldIndex, newIndex } = evt
    if (!to || to === props.rowKey || oldIndex === undefined || newIndex === undefined) return

    evt.item.remove()
    evt.from.insertBefore(evt.item, evt.from.children[oldIndex] ?? null)
    emit('move', props.rowKey, to, oldIndex, newIndex)
  }
})
</script>

<template>
  <div class="flex min-h-14 items-stretch overflow-hidden rounded-md border border-muted">
    <div class="flex w-20 shrink-0 items-center justify-center bg-elevated">
      <UBadge
        :label="label"
        :color="(color as Color) || 'info'"
        variant="soft"
        size="lg"
      />
    </div>

    <div
      ref="el"
      :data-row="rowKey"
      class="flex flex-1 flex-wrap items-center gap-2 p-2"
    >
      <UBadge
        v-for="item in model"
        :key="item"
        :label="item"
        :icon="icons?.[item]"
        variant="outline"
        color="primary"
        size="lg"
        :class="sortable ? 'cursor-grab' : ''"
      />
    </div>
  </div>
</template>
