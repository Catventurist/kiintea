<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

const props = defineProps<{
  items: { label: string, content: string, value?: string }[]
}>()

const list = ref(props.items.map((item, i) => ({ ...item, value: item.value ?? String(i) })))

const accordion = useTemplateRef<{ $el: HTMLElement }>('accordion')
const el = computed(() => accordion.value?.$el)

useSortable(el, list, {
  animation: 150,
  watchElement: true,
  handle: '[data-drag-handle]'
})
</script>

<template>
  <UAccordion
    ref="accordion"
    :items="list"
    type="multiple"
  >
    <template #leading>
      <UIcon
        name="i-lucide-grip-vertical"
        data-drag-handle
        class="cursor-grab"
        @click.stop
      />
    </template>
  </UAccordion>
</template>
