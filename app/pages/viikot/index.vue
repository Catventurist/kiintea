<script setup lang="ts">
const { t } = useI18n()
const { kieli, kysely } = useViikkoKysely()

const { data: viikot } = await useAsyncData(
  () => `viikot-${kieli.value}`,
  () => kysely().order('viikko', 'DESC').all(),
  { watch: [kieli] }
)

useSeoMeta({
  title: () => t('page.viikot.title'),
  description: () => t('page.viikot.description'),
  ogTitle: () => t('page.viikot.title'),
  ogDescription: () => t('page.viikot.description')
})
</script>

<template>
  <UContainer class="py-8 space-y-6">
    <h1 class="text-2xl font-semibold text-highlighted">
      {{ t('viikot.title') }}
    </h1>

    <FCheckinPanel />

    <div
      v-if="viikot?.length"
      class="grid items-start gap-4 md:grid-cols-2"
    >
      <ULink
        v-for="viikko in viikot"
        :key="viikko.viikko"
        :to="`/viikot/${viikko.viikko}`"
        class="block"
      >
        <FViikkoKortti :viikko="viikko" />
      </ULink>
    </div>

    <UEmpty
      v-else
      icon="i-lucide-calendar-x"
      :title="t('viikot.empty')"
    />
  </UContainer>
</template>
