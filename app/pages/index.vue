<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const { locale } = useI18n()
const route = useRoute()

const { data: page } = await useAsyncData(() => `index-${locale.value}`, async () => {
  const content = await queryCollection(('landing_' + locale.value) as keyof PageCollections).path(route.path).first()

  if (!content && locale.value !== 'en') {
    return await queryCollection('landing_en').path(route.path).first()
  }
  return content
}, { watch: [locale] })

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <div>
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </div>
</template>
