<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

type Target = '_blank' | '_parent' | '_self' | '_top' | null | undefined

interface IconItem {
  icon: string
  label?: string
  id?: string
  to?: string
  target?: Target
}

const props = defineProps<{
  items: IconItem[]
}>()

const list = ref(props.items.map((item, i) => ({ ...item, id: item.id ?? String(i) })))

const container = useTemplateRef<HTMLElement>('container')

useSortable(container, list, {
  animation: 150,
  ghostClass: 'opacity-60'
})
</script>

<template>
  <div
    ref="container"
    class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3"
  >
    <div
      v-for="item in list"
      :key="item.id"
      class="cursor-grab active:cursor-grabbing rounded-lg border border-default"
    >
      <UButton
        :icon="item.icon"
        :label="item.label"
        :to="item.to"
        :target="item.target"
        :draggable="false"
        variant="ghost"
        color="neutral"
        block
        :ui="{
          base: 'flex-col h-auto py-4 gap-2',
          leadingIcon: 'size-8 text-primary',
          label: 'text-sm text-muted'
        }"
      />
    </div>
  </div>
</template>
