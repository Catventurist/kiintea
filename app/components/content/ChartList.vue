<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import type { ChartData } from '@nuxt/ui'

const props = withDefaults(defineProps<{
  data?: ChartData[]
  type?: 'line' | 'area' | 'bar' | 'donut'
  sortable?: boolean
  stateKey?: string
}>(), {
  data: () => [],
  type: 'bar',
  sortable: true,
  stateKey: 'default'
})

const { t } = useI18n()

const rows = useState<ChartData[]>(`chart-list-${props.stateKey}`, () => [...props.data])

const label = (m: string) => {
  const key = `charts.months.${m}`
  const out = t(key)
  return out === key ? m : out
}

const chartData = computed<ChartData[]>(() =>
  rows.value.map(row => ({ ...row, month: label(String(row.month)) }))
)

const categories = computed(() => [
  { key: 'desktop', label: t('charts.desktop'), color: 'primary' },
  { key: 'mobile', label: t('charts.mobile'), color: 'success' }
])

const list = useTemplateRef<HTMLElement>('list')
useSortable(list, rows, {
  animation: 150,
  handle: '[data-drag]',
  disabled: !props.sortable
})

const desc = ref(true)
function sortBy(key: 'desktop' | 'mobile') {
  rows.value = [...rows.value].sort((a, b) =>
    desc.value ? b[key] - a[key] : a[key] - b[key]
  )
  desc.value = !desc.value
}
</script>

<template>
  <div class="my-6 space-y-4">
    <div
      v-if="sortable"
      class="flex gap-2"
    >
      <UButton
        :label="t('charts.sortDesktop')"
        color="primary"
        icon="i-lucide-monitor"
        @click="sortBy('desktop')"
      />
      <UButton
        :label="t('charts.sortMobile')"
        color="success"
        icon="i-lucide-smartphone"
        @click="sortBy('mobile')"
      />
    </div>

    <UChart
      :type="type"
      :data="chartData"
      index="month"
      :categories="categories"
    />

    <ul
      ref="list"
      class="flex flex-row flex-wrap gap-2"
    >
      <li
        v-for="row in rows"
        :key="String(row.month)"
        class="flex items-center justify-center gap-1 px-2 rounded bg-primary/20"
      >
        <span
          v-if="sortable"
          data-drag
          class="cursor-grab touch-none pt-1.5"
        >
          <UIcon name="i-lucide-grip-vertical" />
        </span>
        {{ label(String(row.month)) }}
      </li>
    </ul>
  </div>
</template>
