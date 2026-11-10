<script setup lang="ts">
interface TroubleshootingCode {
  lang?: string
  file?: string
  content: string
}

interface TroubleshootingLink {
  label: string
  to: string
}

interface TroubleshootingEntry {
  id: string
  problem: string
  cause: string
  fix: string
  severity?: 'error' | 'warning' | 'info'
  tags?: string[]
  since?: string
  code?: TroubleshootingCode
  links?: TroubleshootingLink[]
}

const props = withDefaults(defineProps<{
  group?: string
  title?: string
  searchable?: boolean
  items?: TroubleshootingEntry[]
}>(), {
  group: 'default',
  title: undefined,
  searchable: true,
  items: () => []
})

const { t } = useI18n()

const query = useState<string>(`troubleshooting-query-${props.group}`, () => '')
const activeTag = useState<string | null>(`troubleshooting-tag-${props.group}`, () => null)

const openMap = reactive<Record<string, boolean>>({})

const severityMeta = {
  error: {
    icon: 'i-lucide-circle-x',
    text: 'text-error',
    ring: 'ring-error shadow-lg shadow-error/30'
  },
  warning: {
    icon: 'i-lucide-triangle-alert',
    text: 'text-warning',
    ring: 'ring-warning shadow-lg shadow-warning/30'
  },
  info: {
    icon: 'i-lucide-info',
    text: 'text-info',
    ring: 'ring-info shadow-lg shadow-info/30'
  }
} as const

const entries = computed<TroubleshootingEntry[]>(() =>
  Array.isArray(props.items)
    ? props.items.filter(entry => entry && entry.id && entry.problem)
    : []
)

const allTags = computed(() => {
  const set = new Set<string>()
  for (const entry of entries.value) {
    if (Array.isArray(entry.tags)) entry.tags.forEach(tag => set.add(tag))
  }
  return [...set].sort()
})

const visible = computed(() => {
  const q = query.value.trim().toLowerCase()
  return entries.value.filter((entry) => {
    if (activeTag.value && !(entry.tags ?? []).includes(activeTag.value)) return false
    if (!q) return true
    const haystack = [
      entry.problem,
      entry.cause,
      entry.fix,
      ...(entry.tags ?? [])
    ].join(' ').toLowerCase()
    return haystack.includes(q)
  })
})

function metaFor(entry: TroubleshootingEntry) {
  return severityMeta[entry.severity ?? 'info']
}

function toggleTag(tag: string) {
  activeTag.value = activeTag.value === tag ? null : tag
}

function expandAll() {
  visible.value.forEach((entry) => {
    openMap[entry.id] = true
  })
}

function collapseAll() {
  visible.value.forEach((entry) => {
    openMap[entry.id] = false
  })
}

const toast = useToast()

async function copyCode(entry: TroubleshootingEntry) {
  if (!entry.code?.content) return
  await navigator.clipboard.writeText(entry.code.content)
  toast.add({
    id: `troubleshooting-copied-${entry.id}`,
    title: t('common.copy.codeDone'),
    icon: 'i-lucide-check',
    color: 'success'
  })
}

async function copyLink(entry: TroubleshootingEntry) {
  const url = `${window.location.origin}${window.location.pathname}#${entry.id}`
  await navigator.clipboard.writeText(url)
  toast.add({
    id: `troubleshooting-link-${entry.id}`,
    title: t('common.copy.linkDone'),
    icon: 'i-lucide-link',
    color: 'success'
  })
}

onMounted(() => {
  const hash = window.location.hash.replace('#', '')
  if (!hash || !entries.value.some(entry => entry.id === hash)) return
  openMap[hash] = true
  nextTick(() => {
    document.getElementById(`troubleshooting-${props.group}-${hash}`)
      ?.scrollIntoView({ block: 'start' })
  })
})
</script>

<template>
  <div class="my-6 flex flex-col gap-4">
    <h3
      v-if="title"
      class="text-lg font-semibold text-highlighted"
    >
      {{ title }}
    </h3>

    <div
      v-if="searchable"
      class="flex flex-col gap-3"
    >
      <UInput
        id="trouble-query"
        v-model="query"
        type="search"
        icon="i-lucide-search"
        :placeholder="t('common.search.problems')"
        :aria-label="t('common.search.problems')"
      />

      <div
        v-if="allTags.length"
        class="flex flex-wrap gap-2"
      >
        <UBadge
          v-for="tag in allTags"
          :key="tag"
          :label="tag"
          :color="activeTag === tag ? 'primary' : 'neutral'"
          :variant="activeTag === tag ? 'solid' : 'subtle'"
          class="cursor-pointer select-none"
          role="button"
          tabindex="0"
          :aria-pressed="activeTag === tag"
          @click="toggleTag(tag)"
          @keydown.enter.prevent="toggleTag(tag)"
          @keydown.space.prevent="toggleTag(tag)"
        />
      </div>

      <div class="flex items-center justify-between gap-2 text-sm text-muted">
        <span aria-live="polite">
          {{ t('common.results', { count: visible.length }) }}
        </span>
        <div class="flex gap-1">
          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            :label="t('common.expandAll')"
            @click="expandAll"
          />
          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            :label="t('common.collapseAll')"
            @click="collapseAll"
          />
        </div>
      </div>
    </div>

    <p
      v-if="!visible.length"
      class="py-6 text-center text-sm text-muted"
    >
      {{ t('common.empty.problems') }}
    </p>

    <div
      v-else
      class="flex flex-col gap-3"
    >
      <div
        v-for="entry in visible"
        :id="`troubleshooting-${group}-${entry.id}`"
        :key="entry.id"
        class="scroll-mt-24 rounded-lg ring ring-default"
        :class="openMap[entry.id] ? metaFor(entry).ring : ''"
      >
        <UCollapsible v-model:open="openMap[entry.id]">
          <button
            type="button"
            class="flex w-full select-none items-center gap-3 px-4 py-3 text-left"
          >
            <UIcon
              :name="metaFor(entry).icon"
              class="size-5 shrink-0"
              :class="metaFor(entry).text"
            />
            <span class="flex-1 font-medium text-highlighted">
              {{ entry.problem }}
            </span>
            <UBadge
              v-if="entry.since"
              :label="entry.since"
              color="neutral"
              variant="outline"
              size="sm"
            />
            <UIcon
              name="i-lucide-chevron-down"
              class="size-5 shrink-0 text-muted transition-transform duration-200 motion-reduce:transition-none"
              :class="openMap[entry.id] ? 'rotate-180' : ''"
            />
          </button>

          <template #content>
            <div class="flex flex-col gap-4 border-t border-default px-4 py-4 text-sm">
              <div>
                <p class="mb-1 font-semibold text-highlighted">
                  {{ t('common.cause') }}
                </p>
                <p class="text-muted">
                  {{ entry.cause }}
                </p>
              </div>

              <div>
                <p class="mb-1 font-semibold text-highlighted">
                  {{ t('common.fix') }}
                </p>
                <p class="text-muted">
                  {{ entry.fix }}
                </p>
              </div>

              <div
                v-if="entry.code?.content"
                class="rounded-md bg-elevated"
              >
                <div class="flex items-center justify-between border-b border-default px-3 py-1.5 text-xs text-muted">
                  <span>{{ entry.code.file || entry.code.lang }}</span>
                  <UButton
                    size="xs"
                    variant="ghost"
                    color="neutral"
                    icon="i-lucide-copy"
                    :aria-label="t('common.copy.code')"
                    @click="copyCode(entry)"
                  />
                </div>
                <pre class="overflow-x-auto p-3 text-xs"><code>{{ entry.code.content }}</code></pre>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <UBadge
                  v-for="tag in entry.tags ?? []"
                  :key="tag"
                  :label="tag"
                  color="neutral"
                  variant="subtle"
                  size="sm"
                />
                <UButton
                  v-for="link in entry.links ?? []"
                  :key="link.to"
                  :label="link.label"
                  :to="link.to"
                  target="_blank"
                  size="xs"
                  variant="link"
                  trailing-icon="i-lucide-external-link"
                />
                <UButton
                  class="ml-auto"
                  size="xs"
                  variant="ghost"
                  color="neutral"
                  icon="i-lucide-link"
                  :label="t('common.copy.link')"
                  @click="copyLink(entry)"
                />
              </div>
            </div>
          </template>
        </UCollapsible>
      </div>
    </div>
  </div>
</template>
