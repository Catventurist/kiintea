<script setup lang="ts">
interface RevenueRow {
  month: string
  revenue: number
  costs: number
}

const props = defineProps<{
  data?: RevenueRow[]
}>()

const { t } = useI18n()

const chartData = computed(() => props.data ?? [])
const categories = computed(() => [
  { key: 'revenue' as const, label: t('charts.revenue') },
  { key: 'costs' as const, label: t('charts.costs') }
])
</script>

<template>
  <UCard>
    <template #header>
      <span class="font-medium">{{ t('charts.revenuecost') }}</span>
    </template>
    <UChart
      v-if="chartData.length"
      type="area"
      :data="chartData"
      index="month"
      :categories="categories"
    />
    <UEmpty
      v-else
      :title="t('charts.noData')"
    />
  </UCard>
</template>
