<script setup lang="ts">
interface LeaderboardRow {
  member: string
  points: number
}

const props = defineProps<{
  data?: LeaderboardRow[]
}>()

const { t } = useI18n()

const chartData = computed(() => props.data ?? [])
</script>

<template>
  <UCard>
    <template #header>
      <span class="font-medium">{{ t('charts.leaderboard') }}</span>
    </template>
    <UChart
      v-if="chartData.length"
      type="bar"
      :data="chartData"
      index="member"
      :categories="['points']"
      layout="horizontal"
    />
    <UEmpty
      v-else
      :title="t('charts.noData')"
    />
  </UCard>
</template>
