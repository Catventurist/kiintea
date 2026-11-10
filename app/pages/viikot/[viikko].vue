<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { kieli, kysely } = useViikkoKysely()

const { data: viikko } = await useAsyncData(
  () => `viikko-${kieli.value}-${route.params.viikko}`,
  () => kysely().where('viikko', '=', Number(route.params.viikko)).first(),
  { watch: [kieli] }
)

useSeoMeta({
  title: () => t('page.viikko.title'),
  description: () => t('page.viikko.description'),
  ogTitle: () => t('page.viikko.title'),
  ogDescription: () => t('page.viikko.description')
})
</script>

<template>
  <UContainer class="py-8">
    <FViikkoKortti
      v-if="viikko"
      :viikko="viikko"
    />
  </UContainer>
</template>
