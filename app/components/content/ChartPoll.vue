<script setup lang="ts">
interface PollOption {
  label: string
  count: number
}

const props = defineProps<{
  question?: string
  type?: 'bar' | 'donut'
  data?: PollOption[]
}>()

const { t } = useI18n()

const chartData = computed(() =>
  (props.data ?? []).map(o => ({ name: o.label, votes: o.count }))
)
</script>

<template>
  <UCard>
    <template #header>
      <span class="font-medium">{{ props.question || t('charts.poll') }}</span>
    </template>
    <UChart
      v-if="chartData.length"
      :type="props.type ?? 'donut'"
      :data="chartData"
      index="name"
      :categories="['votes']"
    />
    <UEmpty
      v-else
      :title="t('charts.noData')"
    />
  </UCard>
</template>
