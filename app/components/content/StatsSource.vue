<script setup lang="ts">
type StatColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

const METRICS = ['components', 'pages', 'glossary', 'problems', 'coverage', 'languages'] as const
type Metric = typeof METRICS[number]

const props = withDefaults(defineProps<{
  show?: string[] | string
  columns?: 2 | 3 | 4
}>(), {
  show: undefined,
  columns: 3
})

const { t } = useI18n()
const { data: stats } = useSiteStats()

const icons: Record<Metric, string> = {
  components: 'i-lucide-puzzle',
  pages: 'i-lucide-files',
  coverage: 'i-lucide-languages',
  languages: 'i-lucide-globe',
  glossary: 'i-lucide-book-open',
  problems: 'i-lucide-life-buoy'
}

const colors: Record<Metric, StatColor> = {
  components: 'primary',
  pages: 'secondary',
  coverage: 'success',
  languages: 'neutral',
  glossary: 'warning',
  problems: 'error'
}

const selected = computed<Metric[]>(() => {
  const raw = Array.isArray(props.show)
    ? props.show
    : typeof props.show === 'string'
      ? props.show.split(',')
      : [...METRICS]
  const wanted = raw.map(entry => String(entry).trim())
  return METRICS.filter(metric => wanted.includes(metric))
})

const links: Partial<Record<Metric, string>> = {
  components: '/guides/markdown',
  pages: '/guides',
  glossary: '/glossary',
  problems: '/guides/query/#troubleshooting-source'
}

const items = computed(() =>
  selected.value.map(metric => ({
    label: t(`stats.${metric}`),
    value: stats.value?.[metric] ?? null,
    icon: icons[metric],
    color: colors[metric],
    to: links[metric],
    ...(metric === 'coverage' ? { unit: '%', progress: true } : {})
  }))
)
</script>

<template>
  <Stats
    :columns="columns"
    :items="items"
  />
</template>
