<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

const props = defineProps<{
  items: string[]
  legend?: string
}>()

const list = ref(props.items.map(label => ({ label, value: label })))
const selected = ref<string[]>([])

const group = useTemplateRef<{ $el: HTMLElement }>('group')
const el = computed(() => group.value?.$el?.querySelector('fieldset') as HTMLElement | undefined)

useSortable(el, list, {
  animation: 150,
  watchElement: true
})
</script>

<template>
  <div>
    <p
      v-if="legend"
      class="mb-1 text-sm font-medium"
    >
      {{ legend }}
    </p>
    <UCheckboxGroup
      ref="group"
      v-model="selected"
      :items="list"
      :ui="{ item: 'cursor-grab' }"
    />
  </div>
</template>
