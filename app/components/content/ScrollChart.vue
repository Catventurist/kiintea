<script setup lang="ts">
import { defineChart, lineY, ruleY } from '@tanstack/charts'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { scalePoint } from '@tanstack/charts/scales/point'
import { useScrollyStory } from '~/composables/useReveal'
import { useMediaQuery, useWindowSize } from '@vueuse/core'

interface Series {
  key: string
  label: string
  color?: string
}

interface Step {
  text: string
  show?: string[]
  range?: [string | number, string | number]
  rules?: { y: number, color?: string }[]
}

const props = withDefaults(defineProps<{
  data: Record<string, string | number>[]
  x: string
  series: Series[]
  steps: Step[]
  yLabel?: string
  stepHeight?: number
}>(), { stepHeight: 90 })

const { progress } = useScrollyStory()

const active = computed(() =>
  Math.min(props.steps.length - 1, Math.floor(progress.value * props.steps.length))
)
const step = computed(() => props.steps[active.value]!)

const visibleData = computed(() => {
  const range = step.value.range
  if (!range) return props.data

  const xs = props.data.map(d => String(d[props.x]))
  const from = Math.max(0, xs.indexOf(String(range[0])))
  const to = xs.indexOf(String(range[1]))
  return props.data.slice(from, (to < 0 ? xs.length - 1 : to) + 1)
})

function isShown(s: Series) {
  const show = step.value.show
  return !show || show.includes(s.key)
}

const definition = computed(() => defineChart({
  marks: [
    ...(step.value.rules ?? []).map(r =>
      ruleY([r.y], { stroke: `var(--ui-${r.color ?? 'warning'})`, strokeDasharray: '4 4' })
    ),
    ...props.series.map(s =>
      lineY(props.data, {
        x: d => String(d[props.x]),
        y: d => Number(d[s.key]),
        stroke: `var(--ui-${s.color ?? 'primary'})`,
        strokeWidth: 2,
        strokeOpacity: 0.15
      })
    ),
    ...props.series.filter(isShown).map(s =>
      lineY(visibleData.value, {
        x: d => String(d[props.x]),
        y: d => Number(d[s.key]),
        stroke: `var(--ui-${s.color ?? 'primary'})`,
        strokeWidth: 3,
        points: true
      })
    )
  ],
  scales: {
    x: { scale: () => scalePoint<string>().padding(0.1) },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: props.yLabel } }
  }
}))

const { width: viewportWidth, height: viewportHeight } = useWindowSize({ initialWidth: 1024, initialHeight: 800 })
const isWide = useMediaQuery('(min-width: 768px)')

const stableHeight = ref(viewportHeight.value)
watch(viewportWidth, () => {
  stableHeight.value = viewportHeight.value
})
watch(viewportHeight, (h) => {
  stableHeight.value = Math.max(stableHeight.value, h)
})

const chartHeight = computed(() => {
  const h = stableHeight.value
  return isWide.value
    ? Math.min(520, Math.max(260, Math.round(h * 0.55)))
    : Math.min(320, Math.max(180, Math.round(h * 0.32)))
})
</script>

<template>
  <div
    ref="scrolly"
    class="relative"
  >
    <UProgress
      :model-value="progress * 100"
      size="sm"
      class="sticky top-2 z-40"
    />

    <div class="grid gap-6 md:grid-cols-[1.3fr_1fr] md:gap-12">
      <UCard class="sticky opacity-80 self-start top-[calc(var(--ui-header-height)+2.5rem)] z-30 bg-default md:top-[calc(var(--ui-header-height)+2rem)]">
        <UChart
          :definition="definition"
          :height="chartHeight"
          :aria-label="yLabel"
          :aria-description="step.text"
        />
      </UCard>

      <ol
        ref="steps"
        class="py-[10dvh] text-xl md:text-2xl"
      >
        <li
          v-for="(s, i) in steps"
          :key="i"
          class="flex items-center transition-opacity duration-300"
          :class="i === active ? 'opacity-100' : 'opacity-40'"
          :style="{ minHeight: stepHeight + 'dvh' }"
        >
          {{ s.text }}
        </li>
      </ol>
    </div>
  </div>
</template>
