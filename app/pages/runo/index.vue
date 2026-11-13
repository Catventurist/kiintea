<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const locale = useRouteLocale()

const collection = computed(() => `runo_${locale.value}` as keyof PageCollections)

const { data: docs } = useAsyncData(
  `runo-list-${locale.value}`,
  () => queryCollection(collection.value).all(),
  { watch: [locale] }
)

const { t } = useI18n()

useSeoMeta({
  title: () => t('runo.index.title'),
  description: () => t('runo.index.desc'),
  robots: 'noindex, nofollow'
})
</script>

<template>
  <div class="p-8 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">
      {{ t('runo.index.title') }}
    </h1>

    <UPageGrid
      v-if="docs"
      divide
    >
      <UPageCard
        v-for="d in docs"
        :key="d.path"
        :title="d.title"
        icon="i-lucide-file-text"
        :to="d.path"
        variant="ghost"
      />
    </UPageGrid>

    <UEmpty
      v-else-if="!docs"
      :title="t('runo.empty')"
      icon="i-lucide-inbox"
    />
  </div>
</template>
