<script setup lang="ts">
interface FeedbackRow {
  rating: number
  count: number
}

const props = defineProps<{
  data?: FeedbackRow[]
}>()

const { t } = useI18n()

const chartData = computed(() =>
  (props.data ?? []).map(r => ({ rating: String(r.rating), count: r.count }))
)
</script>

<template>
  <UCard>
    <template #header>
      <span class="font-medium">{{ t('charts.feedback') }}</span>
    </template>
    <UChart
      v-if="chartData.length"
      type="donut"
      :data="chartData"
      index="rating"
      :categories="['count']"
    />
    <UEmpty
      v-else
      :title="t('charts.noData')"
    />
  </UCard>
</template>
