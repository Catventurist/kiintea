<script setup lang="ts">
interface GrowthRow {
  month: string
  members: number
}

const props = defineProps<{
  data?: GrowthRow[]
}>()

const { t } = useI18n()

const chartData = computed(() => props.data ?? [])
</script>

<template>
  <UCard>
    <template #header>
      <span class="font-medium">{{ t('charts.growth') }}</span>
    </template>
    <UChart
      v-if="chartData.length"
      type="area"
      :data="chartData"
      index="month"
      :categories="['members']"
    />
    <UEmpty
      v-else
      :title="t('charts.noData')"
    />
  </UCard>
</template>
