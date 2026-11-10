<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

const props = defineProps<{
  items: { title: string, description?: string, id?: string, icon?: string }[]
}>()

const list = ref(props.items.map((item, i) => ({ ...item, id: item.id ?? String(i) })))

const container = useTemplateRef<HTMLElement>('container')

useSortable(container, list, {
  animation: 150,
  handle: '[data-drag-handle]',
  ghostClass: 'opacity-50'
})
</script>

<template>
  <div
    ref="container"
    class="flex flex-col gap-3"
  >
    <UCard
      v-for="item in list"
      :key="item.id"
    >
      <div class="flex items-start gap-3">
        <UIcon
          :name="item.icon ?? 'i-lucide-grip-vertical'"
          data-drag-handle
          class="mt-0.5 size-5 shrink-0 cursor-grab text-muted"
        />
        <div>
          <p class="font-medium">
            {{ item.title }}
          </p>
          <p
            v-if="item.description"
            class="text-sm text-muted"
          >
            {{ item.description }}
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>
