<script setup lang="ts">
interface SprintRow {
  sprint: string
  done: number
  progress: number
  blocked: number
}

const props = defineProps<{
  data?: SprintRow[]
}>()

const { t } = useI18n()

const chartData = computed(() => props.data ?? [])

const categories = computed(() => [
  { key: 'done' as const, label: t('charts.sprintDone') },
  { key: 'progress' as const, label: t('charts.sprintProgress') },
  { key: 'blocked' as const, label: t('charts.sprintBlocked') }
])
</script>

<template>
  <UCard>
    <template #header>
      <span class="font-medium">{{ t('charts.sprint') }}</span>
    </template>
    <UChart
      v-if="chartData.length"
      type="bar"
      :data="chartData"
      index="sprint"
      :categories="categories"
      stacked
    />
    <UEmpty
      v-else
      :title="t('charts.noData')"
    />
  </UCard>
</template>
