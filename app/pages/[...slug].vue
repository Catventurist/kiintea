<script setup lang="ts">
definePageMeta({
  middleware: 'layout',
  layout: 'dashboard',
  key: route => route.fullPath
})

const { page, ready, surround } = useContentCollection()
const { options } = usePageOptions()

await ready

if (!page.value) {
  throw createError({ status: 404, statusText: 'Page not found', fatal: true })
}

useSeoMeta({
  title: () => page.value?.seo?.title || page.value?.title,
  ogTitle: () => page.value?.seo?.title || page.value?.title,
  description: () => page.value?.seo?.description || page.value?.description,
  ogDescription: () => page.value?.seo?.description || page.value?.description
})
</script>

<template>
  <UPage>
    <UPageBody v-if="page">
      <ContentRenderer :value="page" />
      <template v-if="options.surround && surround">
        <UContentSurround :surround="surround" />
      </template>
    </UPageBody>
  </UPage>
</template>
