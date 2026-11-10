<script setup lang="ts">
import type { Collections, FlowEnCollectionItem, FlowFiCollectionItem } from '@nuxt/content'
import type { ContentSurroundLink, TableColumn } from '@nuxt/ui'

const { locale, t } = useI18n()
const route = useRoute()

const slug = computed(() => (route.params.slug as string[]).join('/'))

const { data: page } = await useAsyncData(() => `flow-${locale.value}-${slug.value}`, async () => {
  const content = await queryCollection(('flow_' + locale.value) as keyof Collections)
    .where('entity', '=', slug.value)
    .first()

  if (!content && locale.value !== 'en') {
    return await queryCollection('flow_en').where('entity', '=', slug.value).first()
  }
  return content as FlowEnCollectionItem | FlowFiCollectionItem
}, { watch: [locale] })

if (!page.value) {
  throw createError({ status: 404, statusText: 'Page not found', fatal: true })
}

const { data: all } = await useFlowList()

const primitives = ['string']

type Row = {
  label: string
  param: string
  value: string
  type: string
  link: boolean
}

const rows = computed<Row[]>(() =>
  Object.entries(page.value?.params ?? {})
    .filter(([, value]) => value != null)
    .map(([param, value]) => {
      const v = String(value)
      const isPrimitive = primitives.includes(v)
      return {
        label: t(`flow.params.${param}`),
        param,
        value: v,
        type: isPrimitive ? t(`flow.primitives.${v}`) : t(`flow.entities.${v}`),
        link: !isPrimitive
      }
    })
)

const columns = computed<TableColumn<Row>[]>(() => [
  { accessorKey: 'label', header: t('flow.param') },
  { accessorKey: 'param', header: 'API' },
  { accessorKey: 'type', header: t('flow.type') }
])

const usedBy = computed(() =>
  (all.value ?? []).flatMap((f) => {
    const via = Object.entries(f.params ?? {})
      .filter(([, value]) => value === slug.value)
      .map(([param]) => param)
    return via.length ? [{ entity: f.entity, title: f.title, via }] : []
  })
)

const surround = computed(() => {
  const ordered = sortFlows(all.value ?? [])
  const i = ordered.findIndex(f => f.entity === slug.value)

  const toItem = (f?: typeof ordered[number]) =>
    f
      ? { title: f.title, description: f.description, path: `/flow/${f.entity}`, stem: f.stem }
      : undefined

  return [toItem(ordered[i - 1]), toItem(ordered[i + 1])] as ContentSurroundLink[]
})

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description
})
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
    >
      <template #headline>
        <div class="flex flex-wrap items-center gap-2">
          <UButton
            to="/flow"
            icon="i-lucide-arrow-left"
            variant="ghost"
            color="neutral"
            size="lg"
          />
          <UBadge
            :label="t(`flow.layers.${page.layer}`)"
            :icon="layerMeta[page.layer].icon"
            :color="layerMeta[page.layer].color"
            variant="subtle"
          />
          <UBadge
            v-for="op in page.operations"
            :key="op"
            :label="t(`flow.operations.${op}`)"
            variant="subtle"
            color="neutral"
          />
        </div>
      </template>
    </UPageHeader>

    <UPageBody>
      <p
        v-if="page.example"
        class="mb-4 text-muted"
      >
        <strong>{{ t('flow.example') }}:</strong> {{ page.example }}
      </p>

      <ULink
        v-if="page.glossary"
        :to="`/glossary/${page.glossary}`"
        icon="i-lucide-book-a"
        class="mb-6 inline-flex"
      >
        {{ t('flow.glossary') }}
      </ULink>

      <UTable
        v-if="rows.length"
        :data="rows"
        :columns="columns"
      >
        <template #type-cell="{ row }">
          <ULink
            v-if="row.original.link"
            :to="`/flow/${row.original.value}`"
          >
            {{ row.original.type }}
          </ULink>
          <span v-else>{{ row.original.type }}</span>
        </template>
      </UTable>

      <UEmpty
        v-else
        icon="i-lucide-filter-x"
        :title="t('flow.noParams')"
      />

      <section
        v-if="usedBy.length"
        class="mt-10"
      >
        <h2 class="mb-3 text-lg font-semibold">
          {{ t('flow.usedBy') }}
        </h2>
        <ul class="space-y-2">
          <li
            v-for="item in usedBy"
            :key="item.entity"
            class="flex flex-wrap items-center gap-2"
          >
            <ULink :to="`/flow/${item.entity}`">{{ item.title }}</ULink>
            <UBadge
              v-for="p in item.via"
              :key="p"
              :label="p"
              variant="outline"
              color="neutral"
              size="sm"
            />
          </li>
        </ul>
      </section>

      <UContentSurround
        :surround="surround"
        class="mt-10"
      />
    </UPageBody>
  </UPage>
</template>
