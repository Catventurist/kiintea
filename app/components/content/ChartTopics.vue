<script setup lang="ts">
interface TopicRow {
  topic: string
  count: number
}

const props = defineProps<{
  data?: TopicRow[]
}>()

const { t } = useI18n()

const chartData = computed(() =>
  (props.data ?? []).map(r => ({ name: r.topic, value: r.count }))
)
</script>

<template>
  <UCard>
    <template #header>
      <span class="font-medium">{{ t('charts.topics') }}</span>
    </template>
    <UChart
      v-if="chartData.length"
      type="donut"
      :data="chartData"
      index="name"
      :categories="['value']"
    />
    <UEmpty
      v-else
      :title="t('charts.noData')"
    />
  </UCard>
</template>
