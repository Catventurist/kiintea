<script setup lang="ts">
const { navigation, files } = useContentCollection()
const { locale, locales } = useI18n()

const current = computed(() => locales.value.find(l => l.code === locale.value))

useHead(() => ({
  htmlAttrs: {
    lang: current.value?.language ?? locale.value,
    dir: current.value?.dir ?? 'ltr'
  }
}))
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <ClientOnly>
        <LazyUContentSearch
          :files="files"
          :navigation="navigation"
          :fuse="{ resultLimit: 42 }"
          hydrate-on-idle
        />
      </ClientOnly>
    </UMain>
  </UApp>
</template>
