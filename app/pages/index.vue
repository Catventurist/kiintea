<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

definePageMeta({ key: route => route.fullPath })

const route = useRoute()
const locale = useRouteLocale()

const { data: page } = await useAsyncData(
  () => `index-${route.path}`,
  () => queryCollection(`landing_${locale.value}` as keyof PageCollections).path(route.path).first(),
  { watch: [() => route.path] }
)

useSeoMeta({
  title: () => page.value?.seo?.title || page.value?.title,
  ogTitle: () => page.value?.seo?.title || page.value?.title,
  description: () => page.value?.seo?.description || page.value?.description,
  ogDescription: () => page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
