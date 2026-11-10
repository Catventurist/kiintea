<script setup lang="ts">
const { t } = useI18n()
const { data: flows } = await useFlowList()

const search = ref('')
const layer = ref<'all' | Layer>('all')

const layerItems = computed(() => [
  { label: t('flow.allLayers'), value: 'all' },
  ...layers.map(l => ({ label: t(`flow.layers.${l}`), value: l, icon: layerMeta[l].icon }))
])

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return sortFlows(flows.value ?? []).filter(f =>
    (layer.value === 'all' || f.layer === layer.value)
    && (!q || [f.title, f.description, f.entity].join(' ').toLowerCase().includes(q))
  )
})

const groups = computed(() =>
  layers
    .map(l => ({ layer: l, items: filtered.value.filter(f => f.layer === l) }))
    .filter(g => g.items.length)
)

useSeoMeta({
  title: () => t('page.flow.title'),
  description: () => t('page.flow.description'),
  ogTitle: () => t('page.flow.title'),
  ogDescription: () => t('page.flow.description')
})
</script>

<template>
  <UPage>
    <UPageHeader :title="t('flow.title')" />

    <UPageBody>
      <div class="mb-8 flex flex-col gap-3 sm:flex-row">
        <UInput
          v-model="search"
          icon="i-lucide-search"
          :placeholder="t('flow.search')"
          class="sm:w-80"
        />
        <USelect
          v-model="layer"
          :items="layerItems"
          class="sm:w-56"
        />
      </div>

      <section
        v-for="group in groups"
        :key="group.layer"
        class="mb-10"
      >
        <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold">
          <UIcon :name="layerMeta[group.layer].icon" />
          {{ t(`flow.layers.${group.layer}`) }}
        </h2>

        <UPageGrid>
          <UPageCard
            v-for="flow in group.items"
            :key="flow.entity"
            :title="flow.title"
            :description="flow.description"
            :icon="layerMeta[flow.layer].icon"
            :to="`/flow/${flow.entity}`"
          >
            <div class="flex flex-wrap gap-1">
              <UBadge
                v-for="op in flow.operations"
                :key="op"
                :label="t(`flow.operations.${op}`)"
                variant="subtle"
                color="neutral"
                size="sm"
              />
            </div>
          </UPageCard>
        </UPageGrid>
      </section>

      <UEmpty
        v-if="!groups.length"
        icon="i-lucide-search-x"
        :title="t('flow.noResults')"
      />
    </UPageBody>
  </UPage>
</template>
