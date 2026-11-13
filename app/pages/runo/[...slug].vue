<script setup lang="ts">
import type { PageCollections, RunoEnCollectionItem, RunoFiCollectionItem } from '@nuxt/content'

type RunoDoc = RunoEnCollectionItem | RunoFiCollectionItem

const route = useRoute()
const locale = useRouteLocale()
const { t } = useI18n()

const collection = computed(() => `runo_${locale.value}` as keyof PageCollections)

const { data: doc } = await useAsyncData(
  () => `runo-${route.path}`,
  () => queryCollection(collection.value).path(route.path).first() as Promise<RunoDoc | null>,
  { watch: [() => route.path] }
)

const tabs = computed(() => [
  { label: t('runo.document'), value: 'doc', icon: 'i-lucide-file-text', slot: 'doc' },
  { label: t('runo.share'), value: 'share', icon: 'i-lucide-share-2', slot: 'share' }
])

useSeoMeta({
  title: () => doc.value?.title ?? '',
  description: () => doc.value?.description
})
</script>

<template>
  <UPage>
    <div class="p-8 max-w-2xl mx-auto">
      <h1
        v-if="doc"
        class="text-2xl font-bold mb-4"
      >
        {{ doc.title }}
      </h1>

      <FRunoJako
        v-if="doc?.encrypted"
        :blob="doc.blob"
      />

      <UTabs
        v-else-if="doc"
        :items="tabs"
        variant="link"
        default-value="doc"
        class="w-full"
      >
        <template #doc>
          <ContentRenderer
            :value="doc"
            class="pt-4"
          />
        </template>
        <template #share>
          <div class="pt-4">
            <FRunoJako
              :content="doc.rawbody"
              :tabs="false"
            />
          </div>
        </template>
      </UTabs>

      <FRunoJako v-else />
    </div>
  </UPage>
</template>
