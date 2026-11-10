<script setup lang="ts">
import { en, fi } from '@nuxt/ui/locale'

const { locale, setLocale } = useI18n()
</script>

<template>
  <LazyULocaleSelect
    :model-value="locale"
    :locales="[en, fi]"
    @update:model-value="setLocale($event as typeof locale)"
  />
</template>
