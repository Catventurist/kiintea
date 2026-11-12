<script setup lang="ts">
interface AttendanceRow {
  month: string
  count: number
}

const props = defineProps<{
  title?: string
  data?: AttendanceRow[]
}>()

const { t } = useI18n()

const chartData = computed(() =>
  (props.data ?? []).map(r => ({ month: r.month, count: r.count }))
)
</script>

<template>
  <UCard>
    <template #header>
      <span class="font-medium">{{ props.title || t('charts.attendance') }}</span>
    </template>
    <UChart
      v-if="chartData.length"
      type="line"
      :data="chartData"
      index="month"
      :categories="['count']"
    />
    <UEmpty
      v-else
      :title="t('charts.noData')"
    />
  </UCard>
</template>
