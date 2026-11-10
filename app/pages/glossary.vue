<script setup lang="ts">
import type { Collections } from '@nuxt/content'
import { useSortable } from '@vueuse/integrations/useSortable'

interface GlossaryEntry {
  slug: string
  title: string
  text?: string
  description?: string
  to?: string
  icon?: string
}

type GlossaryRow = Omit<GlossaryEntry, 'slug' | 'title'> & { stem: string, title?: string }

const { t, locale } = useI18n()

const query = ref('')
const custom = ref(false)
const order = useState<string[]>('glossary-order', () => [])

function slugOf(stem: string) {
  return stem.split('/').pop() ?? stem
}

async function load(collection: keyof Collections): Promise<GlossaryEntry[]> {
  const rows = await queryCollection(collection).all() as GlossaryRow[]
  return rows.map(({ stem, title, ...rest }) => {
    const slug = slugOf(stem)
    return { ...rest, slug, title: title ?? slug }
  })
}

const { data: items } = await useAsyncData<GlossaryEntry[]>('glossary-all-' + locale.value, async () => {
  const local = await load(('glossary_' + locale.value) as keyof Collections)
  if (locale.value === 'en') return local
  const merged = new Map((await load('glossary_en')).map((entry: GlossaryEntry) => [entry.slug, entry] as const))
  for (const entry of local) merged.set(entry.slug, entry)
  return [...merged.values()]
}, {
  watch: [locale]
})

const entries = computed<GlossaryEntry[]>(() => [...(items.value ?? [])]
  .sort((a: GlossaryEntry, b: GlossaryEntry) => a.title.localeCompare(b.title, locale.value)))

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  if (!needle) return entries.value
  return entries.value.filter((entry: GlossaryEntry) => [entry.title, entry.text, entry.description]
    .some(field => field?.toLowerCase().includes(needle)))
})

const groups = computed(() => {
  const result: { letter: string, entries: GlossaryEntry[] }[] = []
  for (const entry of filtered.value) {
    const letter = entry.title.charAt(0).toLocaleUpperCase(locale.value)
    const last = result[result.length - 1]
    if (last?.letter === letter) last.entries.push(entry)
    else result.push({ letter, entries: [entry] })
  }
  return result
})

const ordered = computed<GlossaryEntry[]>({
  get: () => {
    const rank = (slug: string) => {
      const index = order.value.indexOf(slug)
      return index === -1 ? Number.MAX_SAFE_INTEGER : index
    }
    return [...entries.value].sort((a, b) => rank(a.slug) - rank(b.slug))
  },
  set: (value) => {
    order.value = value.map(entry => entry.slug)
  }
})

const list = useTemplateRef<HTMLElement>('list')

useSortable(list, ordered, {
  animation: 150,
  draggable: '[data-slug]',
  ghostClass: 'opacity-40',
  forceFallback: true,
  fallbackOnBody: true,
  fallbackTolerance: 5
})

useSeoMeta({
  title: () => t('page.glossary.title'),
  description: () => t('page.glossary.description'),
  ogTitle: () => t('page.glossary.title'),
  ogDescription: () => t('page.glossary.description')
})
</script>

<template>
  <UContainer class="py-10">
    <UPageHeader
      :title="t('page.glossary.title')"
      :description="t('page.glossary.description')"
      class="mb-8"
    />

    <div class="space-y-6">
      <div class="flex flex-wrap items-center gap-3">
        <UInput
          id="glossary-query"
          v-model="query"
          icon="i-lucide-search"
          class="min-w-48 flex-1"
          :disabled="custom"
          :placeholder="t('common.search.terms')"
        />
        <USwitch
          v-model="custom"
          :label="t('common.custom')"
        />
        <UButton
          v-if="custom && order.length"
          color="neutral"
          variant="ghost"
          icon="i-lucide-rotate-ccw"
          :label="t('common.reset')"
          @click="order = []"
        />
      </div>

      <template v-if="!custom">
        <p
          v-if="!groups.length"
          class="text-sm text-muted"
        >
          {{ t('common.empty.terms') }}
        </p>

        <section
          v-for="group in groups"
          :key="group.letter"
          class="space-y-3"
        >
          <div class="border-b border-default pb-1 text-sm font-semibold text-primary">
            {{ group.letter }}
          </div>

          <div
            v-for="entry in group.entries"
            :id="entry.slug"
            :key="entry.slug"
            class="scroll-mt-24 space-y-1"
          >
            <p class="flex items-center gap-1.5 font-medium text-highlighted">
              <UIcon
                v-if="entry.icon"
                :name="entry.icon"
                class="size-4 text-primary"
              />
              {{ entry.title }}
            </p>
            <p class="text-sm text-muted">
              {{ entry.description ?? entry.text }}
            </p>
            <ULink
              v-if="entry.to"
              :to="entry.to"
              class="text-sm text-primary"
            >
              {{ t('common.read') }}
            </ULink>
          </div>
        </section>
      </template>

      <div
        v-show="custom"
        ref="list"
      >
        <div
          v-for="entry in ordered"
          :key="entry.slug"
          :data-slug="entry.slug"
          class="cursor-grab select-none space-y-1 py-3"
        >
          <p class="flex items-center gap-1.5 font-medium text-highlighted">
            <UIcon
              name="i-lucide-grip-vertical"
              class="size-4 text-muted"
            />
            {{ entry.title }}
          </p>
          <p class="pl-5.5 text-sm text-muted">
            {{ entry.description ?? entry.text }}
          </p>
        </div>
      </div>
    </div>
  </UContainer>
</template>
