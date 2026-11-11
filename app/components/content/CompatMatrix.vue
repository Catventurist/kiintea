<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

type Status = 'supported' | 'partial' | 'unsupported'

interface MatrixRow {
  name: string
  support: string[]
  note?: string
}

const props = withDefaults(defineProps<{
  columns?: string[]
  rows?: MatrixRow[]
  size?: 'xs' | 'sm' | 'md'
}>(), {
  columns: () => [],
  rows: () => [],
  size: 'sm'
})

const list = ref<MatrixRow[]>(props.rows.map(row => ({ ...row })))
const container = useTemplateRef<HTMLElement>('container')

const { t } = useI18n()

const statuses = {
  supported: { color: 'success', icon: 'i-lucide-check' },
  partial: { color: 'warning', icon: 'i-lucide-minus' },
  unsupported: { color: 'error', icon: 'i-lucide-x' }
} as const

function status(value?: string) {
  if (value && value in statuses) {
    const key = value as Status
    return { ...statuses[key], label: t(`common.status.${key}`) }
  }
  return { color: 'neutral', icon: 'i-lucide-circle-help', label: t('common.status.unknown') } as const
}

useSortable(container, list, {
  animation: 150,
  draggable: '[data-row]',
  handle: '[data-drag-handle]',
  ghostClass: 'opacity-60',
  forceFallback: true,
  fallbackOnBody: true,
  fallbackTolerance: 3
})
</script>

<template>
  <div class="overflow-x-auto">
    <div class="min-w-96 space-y-1">
      <div class="grid grid-cols-[10rem_1fr] items-center gap-3">
        <span />
        <UFieldGroup
          :size="size"
          class="w-full"
        >
          <UButton
            v-for="column in columns"
            :key="column"
            :label="column"
            color="neutral"
            variant="outline"
            as="div"
            tabindex="-1"
            class="pointer-events-none flex-1 justify-center"
          />
        </UFieldGroup>
      </div>

      <div ref="container">
        <div
          v-for="row in list"
          :key="row.name"
          data-row
          class="grid grid-cols-[10rem_1fr] items-center gap-3 py-1"
          :title="row.note"
        >
          <div class="flex min-w-0 items-center gap-2">
            <UIcon
              name="i-lucide-grip-vertical"
              data-drag-handle
              class="size-4 shrink-0 cursor-grab text-muted active:cursor-grabbing"
            />
            <span class="truncate text-sm font-medium">{{ row.name }}</span>
          </div>

          <UFieldGroup
            :size="size"
            class="w-full"
          >
            <UButton
              v-for="(column, index) in columns"
              :key="column"
              :icon="status(row.support[index]).icon"
              :color="status(row.support[index]).color"
              :aria-label="`${row.name}, ${column}: ${status(row.support[index]).label}`"
              role="img"
              variant="subtle"
              as="div"
              class="pointer-events-none flex-1 justify-center"
            />
          </UFieldGroup>
        </div>
      </div>
    </div>
  </div>
</template>
