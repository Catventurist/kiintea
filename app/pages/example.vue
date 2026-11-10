<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

definePageMeta({ layout: 'default' })

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const active = computed({
  get: () => {
    const tab = route.query.tab
    return items.value.some(i => i.value === tab) ? String(tab) : 'onboarding'
  },
  set: (tab) => {
    router.replace({ query: { ...route.query, tab } })
  }
})

const items = computed<TabsItem[]>(() => [
  { value: 'onboarding', slot: 'onboarding', label: t('page.tabs.onboarding'), icon: 'i-lucide-rocket' },
  { value: 'stats', slot: 'stats', label: t('page.tabs.stats'), icon: 'i-lucide-chart-column' },
  { value: 'bookmarks', slot: 'bookmarks', label: t('page.tabs.bookmarks'), icon: 'i-lucide-bookmark' }
])

useSeoMeta({
  title: () => t('page.example.title'),
  description: () => t('page.example.description'),
  ogTitle: () => t('page.example.title'),
  ogDescription: () => t('page.example.description')
})
</script>

<template>
  <div class="flex flex-col gap-4 items-center w-full">
    <UTabs
      v-model="active"
      :items="items"
      :unmount-on-hide="false"
      class="w-full"
      :ui="{ content: 'flex flex-col gap-4 items-center pt-4 animate-rise motion-reduce:animate-none' }"
    >
      <template #onboarding>
        <LazyEOnBoarding />
      </template>

      <template #stats>
        <LazyStatsSource />
      </template>

      <template #bookmarks>
        <LazyEBookmarks />
      </template>
    </UTabs>
  </div>
</template>
