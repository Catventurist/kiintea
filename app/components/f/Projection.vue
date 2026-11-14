<script setup lang="ts">
import { defineChart, areaY, lineY, ruleY, stack, barY } from '@tanstack/charts'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { scalePoint } from '@tanstack/charts/scales/point'

const { t } = useI18n()

const popRaw = [
  { year: '1986', value: 4.92, series: 'natural' },
  { year: '1986', value: 0.00, series: 'immigration' },
  { year: '1996', value: 5.10, series: 'natural' },
  { year: '1996', value: 0.03, series: 'immigration' },
  { year: '2006', value: 5.17, series: 'natural' },
  { year: '2006', value: 0.10, series: 'immigration' },
  { year: '2016', value: 5.20, series: 'natural' },
  { year: '2016', value: 0.22, series: 'immigration' },
  { year: '2026', value: 5.17, series: 'natural' },
  { year: '2026', value: 0.48, series: 'immigration' },
  { year: '2036', value: 4.83, series: 'natural' },
  { year: '2036', value: 0.73, series: 'immigration' },
  { year: '2046', value: 4.39, series: 'natural' },
  { year: '2046', value: 0.88, series: 'immigration' }
]

const birthRaw = [
  { year: '1986', value: 55, series: 'births' },
  { year: '1986', value: -45, series: 'deaths' },
  { year: '1996', value: 50, series: 'births' },
  { year: '1996', value: -48, series: 'deaths' },
  { year: '2006', value: 53, series: 'births' },
  { year: '2006', value: -49, series: 'deaths' },
  { year: '2016', value: 52, series: 'births' },
  { year: '2016', value: -52, series: 'deaths' },
  { year: '2026', value: 46, series: 'births' },
  { year: '2026', value: -59, series: 'deaths' },
  { year: '2036', value: 42, series: 'births' },
  { year: '2036', value: -62, series: 'deaths' },
  { year: '2046', value: 38, series: 'births' },
  { year: '2046', value: -65, series: 'deaths' }
]

const data = [
  { year: '1986', debt: 16.4, unemployment: 5.3 },
  { year: '1996', debt: 55.4, unemployment: 15.6 },
  { year: '2006', debt: 38.0, unemployment: 7.7 },
  { year: '2016', debt: 68.0, unemployment: 8.8 },
  { year: '2026', debt: 90, unemployment: 11 },
  { year: '2036', debt: 105, unemployment: 13.5 },
  { year: '2046', debt: 115, unemployment: 15 }
]

const baseScales = {
  x: { scale: () => scalePoint<string>().padding(0.1) },
  y: { scale: scaleLinear, nice: true, grid: true }
}

// The series names are translated, so the chart definitions depend on the locale
const label = (key: string) => t(`demographics.series.${key}`)

const popDefinition = computed(() => defineChart({
  marks: [
    areaY(popRaw.map(r => ({ ...r, series: label(r.series) })), {
      x: 'year',
      y: 'value',
      color: 'series',
      layout: stack({ order: [label('natural'), label('immigration')] }),
      fillOpacity: 0.4
    })
  ],
  scales: { ...baseScales, y: { ...baseScales.y, axis: { label: t('demographics.population.axis') } } },
  color: {
    domain: [label('natural'), label('immigration')],
    range: ['var(--ui-primary)', 'var(--ui-warning)']
  }
}))

const debtDefinition = computed(() => defineChart({
  marks: [
    ruleY([60], { stroke: 'var(--ui-warning)', strokeDasharray: '4 4' }),
    lineY(data, { x: 'year', y: 'debt', stroke: 'var(--ui-error)', strokeWidth: 2, points: true })
  ],
  scales: { ...baseScales, y: { ...baseScales.y, axis: { label: t('demographics.debt.axis') } } }
}))

const unempDefinition = computed(() => defineChart({
  marks: [
    ruleY([6.5], { stroke: 'var(--ui-success)', strokeDasharray: '4 4' }),
    ruleY([15.6], { stroke: 'var(--ui-neutral)', strokeDasharray: '2 2' }),
    lineY(data, { x: 'year', y: 'unemployment', stroke: 'var(--ui-error)', strokeWidth: 2, points: true })
  ],
  scales: { ...baseScales, y: { ...baseScales.y, axis: { label: t('demographics.unemployment.axis') } } }
}))

const birthDefinition = computed(() => defineChart({
  margin: { left: 40 },
  marks: [
    ruleY([0], { stroke: 'var(--ui-neutral)', strokeWidth: 1 }),
    barY(birthRaw.map(r => ({ ...r, series: label(r.series) })), {
      x: 'year',
      y: 'value',
      color: 'series',
      layout: stack({ order: [label('births'), label('deaths')] })
    })
  ],
  scales: {
    x: { scale: () => scalePoint<string>().padding(0.44) },
    y: { scale: scaleLinear, nice: true, grid: true, axis: { label: t('demographics.births.axis') } }
  },
  color: {
    domain: [label('births'), label('deaths')],
    range: ['var(--ui-primary)', 'var(--ui-error)']
  }
}))
</script>

<template>
  <div class="space-y-10">
    <div>
      <h2 class="text-lg font-semibold">
        {{ t('demographics.population.title') }}
      </h2>
      <p class="mb-3 text-sm text-muted">
        {{ t('demographics.population.text') }}
      </p>
      <UChart
        :definition="popDefinition"
        :aria-label="t('demographics.population.aria')"
      />
    </div>

    <div>
      <h2 class="text-lg font-semibold">
        {{ t('demographics.debt.title') }}
      </h2>
      <p class="mb-3 text-sm text-muted">
        {{ t('demographics.debt.text') }}
      </p>
      <UChart
        :definition="debtDefinition"
        :aria-label="t('demographics.debt.aria')"
      />
    </div>

    <div>
      <h2 class="text-lg font-semibold">
        {{ t('demographics.unemployment.title') }}
      </h2>
      <p class="mb-3 text-sm text-muted">
        {{ t('demographics.unemployment.text') }}
      </p>
      <UChart
        :definition="unempDefinition"
        :aria-label="t('demographics.unemployment.aria')"
      />
    </div>

    <div>
      <h2 class="text-lg font-semibold">
        {{ t('demographics.births.title') }}
      </h2>
      <p class="mb-3 text-sm text-muted">
        {{ t('demographics.births.text') }}
      </p>
      <UChart
        :definition="birthDefinition"
        :aria-label="t('demographics.births.aria')"
      />
    </div>
  </div>
</template>
