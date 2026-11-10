<script setup lang="ts">
import { useSortable, moveArrayElement, insertNodeAt, removeNode } from '@vueuse/integrations/useSortable'

interface SortableStep {
  title: string
  description?: string
  icon?: string
}

const props = defineProps<{
  items: SortableStep[]
}>()

const { t } = useI18n()
const list = ref<SortableStep[]>(props.items.map(item => ({ ...item })))
const active = ref(0)

const stepper = useTemplateRef<{ $el: HTMLElement }>('stepper')
const el = computed(() => stepper.value?.$el?.querySelector('[data-slot="header"]') as HTMLElement | undefined)

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
  <div class="space-y-4">
    <UStepper
      ref="stepper"
      v-model="active"
      :items="list"
      :linear="false"
      :ui="{ item: 'cursor-grab active:cursor-grabbing' }"
    />
    <div class="flex justify-between">
      <UButton
        :label="t('common.prev')"
        :disabled="active === 0"
        variant="soft"
        @click="active--"
      />
      <UButton
        :label="t('common.next')"
        :disabled="active === list.length - 1"
        variant="soft"
        @click="active++"
      />
    </div>
  </div>
</template>
