<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

const { t } = useI18n()

const keys = ['prior', 'granular', 'reject', 'wall', 'reprompt', 'proof'] as const

const data = computed(() => keys.map(key => ({
  requirement: t(`consent.${key}.title`),
  detail: t(`consent.${key}.detail`)
})))

const columns = computed<TableColumn<(typeof data.value)[number]>[]>(() => [
  { accessorKey: 'requirement', header: t('consent.requirement') },
  { accessorKey: 'detail', header: t('consent.detail') }
])
</script>

<template>
  <UTable
    :data="data"
    :columns="columns"
  />
</template>
