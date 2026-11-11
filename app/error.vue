<script setup lang="ts">
import type { NuxtError } from '#app'
import { useSortable } from '@vueuse/integrations/useSortable'
import { findPageChildren } from '@nuxt/content/utils'

const props = defineProps<{
  error: NuxtError
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const status = computed(() => props.error.status ?? props.error.status)
const display = computed(() => isNotFound.value
  ? {
      ...props.error,
      statusText: t('error.notFound.title'),
      message: t('error.notFound.description', { path: route.path })
    }
  : {
      ...props.error,
      statusText: t('error.generic.title'),
      message: t('error.generic.description')
    })

const pages = [
  { label: 'guides', to: '/guides', icon: 'i-lucide-book' },
  { label: 'glossary', to: '/glossary', icon: 'i-lucide-book-open' },
  { label: 'example', to: '/example', icon: 'i-lucide-flask-conical' },
  { label: 'flow', to: '/flow', icon: 'i-lucide-workflow' },
  { label: 'weeks', to: '/viikot', icon: 'i-lucide-calendar-days' }
]

function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0]!
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j]!
      row[j] = Math.min(row[j]! + 1, row[j - 1]! + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = tmp
    }
  }
  return row[b.length]!
}

/* const suggestions = computed(() => {
  const wanted = route.path.split('/').filter(Boolean)[0]?.toLowerCase() ?? ''
  return pages
    .map(p => ({ ...p, d: distance(wanted, p.to.slice(1)) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 3)
}) */

const ranked = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  if (segments[0] === locale.value) segments.shift()
  const wanted = segments[0]?.toLowerCase() ?? ''

  return [...pages].sort((a, b) =>
    distance(wanted, a.to.slice(1)) - distance(wanted, b.to.slice(1)))
})

const saved = useState<string[]>('error-links-order', () => [])

const items = ref(
  saved.value.length
    ? [
        ...saved.value.map(l => pages.find(p => p.label === l)).filter(p => !!p),
        ...ranked.value.filter(p => !saved.value.includes(p.label))
      ]
    : ranked.value
)

const list = useTemplateRef<HTMLElement>('list')

const isNotFound = computed(() => status.value === 404)
const isDev = import.meta.dev
const navigation = isNotFound.value ? useContentCollection().navigation : ref([])

const contentSuggestions = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  if (segments[0] === locale.value) segments.shift()
  if (segments.length < 2) return []

  const leaf = segments.at(-1)!.toLowerCase()

  for (let depth = segments.length - 1; depth >= 1; depth--) {
    const parent = `/${locale.value}/${segments.slice(0, depth).join('/')}`
    const children = findPageChildren(navigation.value, parent)

    if (children?.length) {
      return children
        .filter(c => c.path && c.path !== route.path)
        .sort((a, b) =>
          distance(leaf, a.path.split('/').at(-1)!.toLowerCase())
          - distance(leaf, b.path.split('/').at(-1)!.toLowerCase()))
        .slice(0, 5)
    }
  }

  return []
})

useSortable(list, items, {
  animation: 150,
  ghostClass: 'opacity-50',
  handle: '[data-drag-handle]'
})

watch(items, (v) => {
  saved.value = v.map(p => p.label)
}, { deep: true })
</script>

<template>
  <UApp>
    <NuxtLayout name="default">
      <UError
        :error="display"
        :as="{ root: 'div' }"
        :icon="isNotFound ? 'i-lucide-file-question' : 'i-lucide-triangle-alert'"
      >
        <template #links>
          <div class="flex flex-col items-center gap-6">
            <div class="flex flex-wrap justify-center gap-2">
              <UButton
                v-if="!isNotFound"
                :label="t('error.retry')"
                icon="i-lucide-refresh-cw"
                size="lg"
                @click="reloadNuxtApp()"
              />
              <UButton
                :label="t('error.back')"
                icon="i-lucide-house"
                size="lg"
                :color="isNotFound ? 'primary' : 'neutral'"
                :variant="isNotFound ? 'soft' : 'outline'"
                @click="clearError({ redirect: localePath('/') })"
              />
            </div>

            <template v-if="isNotFound">
              <div class="flex flex-col items-center gap-3">
                <p class="text-sm text-muted">
                  {{ t('error.suggestions') }}
                </p>
                <div
                  v-if="!contentSuggestions.length"
                  ref="list"
                  class="flex flex-wrap justify-center gap-2"
                >
                  <div
                    v-for="s in items"
                    :key="s.label"
                    class="flex items-center gap-1"
                  >
                    <UIcon
                      name="i-lucide-grip-vertical"
                      data-drag-handle
                      class="cursor-grab text-muted"
                    />
                    <UButton
                      :to="localePath(s.to)"
                      :icon="s.icon"
                      :label="t(`error.pages.${s.label}`)"
                      color="neutral"
                      variant="subtle"
                    />
                  </div>
                </div>
              </div>

              <div
                v-if="contentSuggestions.length"
                class="flex flex-col items-center gap-3"
              >
                <!-- <p class="text-sm text-muted">
                  {{ t('error.related') }}
                </p> -->
                <div class="flex flex-wrap justify-center gap-2">
                  <UButton
                    v-for="p in contentSuggestions"
                    :key="p.path"
                    :to="p.path"
                    :label="p.title"
                    icon="i-lucide-file-text"
                    color="neutral"
                    variant="outline"
                  />
                </div>
              </div>
            </template>

            <pre
              v-else-if="isDev"
              class="max-w-xl overflow-x-auto rounded-md bg-elevated p-3 text-left text-xs"
            >{{ error.message }}</pre>
          </div>
        </template>
      </UError>
    </NuxtLayout>
  </UApp>
</template>
