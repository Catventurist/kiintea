<script setup lang="ts">
type StatColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

interface StatItem {
  label: string
  value?: number | string | null
  unit?: string
  icon?: string
  color?: StatColor
  progress?: boolean
  to?: string
}

const props = withDefaults(defineProps<{
  columns?: 2 | 3 | 4
  colorful?: boolean
  items?: StatItem[]
}>(), {
  columns: 3,
  colorful: true,
  items: () => []
})

const { locale } = useI18n()

const gridClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4'
} as const

const iconClasses: Record<StatColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-success',
  info: 'text-info',
  warning: 'text-warning',
  error: 'text-error',
  neutral: 'text-highlighted'
}

const palette: StatColor[] = ['primary', 'info', 'success', 'secondary', 'warning']

const grid = computed(() => gridClasses[Number(props.columns) as 2 | 3 | 4] ?? gridClasses[3])

const cards = computed(() => {
  const list = Array.isArray(props.items) ? props.items.filter(item => item && item.label) : []
  return list.map((item, index) => ({
    ...item,
    color: item.color ?? (props.colorful ? palette[index % palette.length] as StatColor : 'primary')
  }))
})

function numeric(item: StatItem) {
  return typeof item.value === 'number' && Number.isFinite(item.value) ? item.value : null
}

function format(value: number) {
  return new Intl.NumberFormat(locale.value).format(value)
}

function finalText(item: StatItem) {
  const n = numeric(item)
  if (n !== null) return format(n)
  return item.value === null || item.value === undefined || item.value === '' ? '\u2014' : String(item.value)
}

const display = ref<number[]>([])

function targets() {
  return cards.value.map(item => numeric(item) ?? 0)
}

let frame = 0

function animate() {
  const to = targets()
  const duration = 800
  const start = performance.now()

  const step = (now: number) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    display.value = to.map(value => Math.round(value * eased))
    if (t < 1) frame = requestAnimationFrame(step)
  }

  display.value = to.map(() => 0)
  frame = requestAnimationFrame(step)
}

display.value = targets()

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduced) animate()
})

watch(cards, () => {
  cancelAnimationFrame(frame)
  display.value = targets()
})

onBeforeUnmount(() => cancelAnimationFrame(frame))

function shownText(item: StatItem, index: number) {
  return numeric(item) !== null ? format(display.value[index] ?? 0) : finalText(item)
}

function barValue(index: number) {
  return Math.min(100, Math.max(0, display.value[index] ?? 0))
}
</script>

<template>
  <div
    v-if="cards.length"
    class="my-6 mx-2  grid grid-cols-1 gap-4"
    :class="grid"
  >
    <UPageCard
      v-for="(item, index) in cards"
      :key="`${index}-${item.label}`"
      :icon="item.icon"
      :to="item.to"
      variant="outline"
      :ui="{ leadingIcon: iconClasses[item.color] }"
      class="animate-stat-in motion-reduce:animate-none duration-300 hover:scale-110 hover:bg-radial hover:from-secondary/20"
      :style="{ animationDelay: `${index * 80}ms` }"
    >
      <template #title>
        <span class="flex items-center justify-between gap-2 text-sm font-normal text-muted">
          {{ item.label }}
          <UIcon
            v-if="item.to"
            name="i-lucide-arrow-up-right"
            class="size-4 shrink-0"
          />
        </span>
      </template>

      <template #description>
        <span class="flex items-baseline gap-1 text-3xl font-semibold tabular-nums text-highlighted">
          <span aria-hidden="true">{{ shownText(item, index) }}</span>
          <span class="sr-only">{{ finalText(item) }}</span>
          <span
            v-if="item.unit"
            class="text-base font-normal text-muted"
          >{{ item.unit }}</span>
        </span>
      </template>

      <UProgress
        v-if="item.progress && numeric(item) !== null"
        :model-value="barValue(index)"
        :max="100"
        size="sm"
        :color="item.color"
        :aria-label="item.label"
      />
    </UPageCard>
  </div>
</template>
