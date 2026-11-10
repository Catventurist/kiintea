<script setup lang="ts">
import { refDebounced, useClipboard } from '@vueuse/core'
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import type { DefineComponent } from 'vue'

interface PlaygroundExample {
  label: string
  description?: string
  source: string
}

const props = withDefaults(defineProps<{
  title?: string
  source?: string
  examples?: PlaygroundExample[]
  rows?: number
  stateKey?: string
}>(), {
  examples: () => [],
  rows: 12,
  stateKey: 'default'
})

const { t } = useI18n()
const { copy, copied } = useClipboard()

const initial = props.source ?? props.examples[0]?.source ?? ''
const text = useState<string>('mdc-playground-' + props.stateKey, () => initial)
const shown = refDebounced(text, 300)
const picked = ref(props.examples[0]?.label)

const exampleItems = computed(() => props.examples.map(example => ({
  label: example.label,
  description: example.description,
  value: example.label
})))

const modules = import.meta.glob<{ default: DefineComponent }>('~/components/content/*.vue')

function pascal(name: string) {
  return name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')
}

const components: Record<string, DefineComponent> = {}

for (const [path, loader] of Object.entries(modules)) {
  const file = path.split('/').pop()?.replace('.vue', '') ?? ''
  if (!file || file.toLowerCase() === 'mdc-playground') continue
  const component = defineAsyncComponent(loader)
  components[file] = component
  components[pascal(file)] = component
}

type Parsed = Awaited<ReturnType<typeof parseMarkdown>>

const parsed = shallowRef<Parsed | null>(null)
const failure = ref('')
const version = ref(0)

async function render(value: string) {
  try {
    parsed.value = await parseMarkdown(value)
    failure.value = ''
    version.value++
  } catch (error) {
    failure.value = error instanceof Error ? error.message : String(error)
  }
}

watch(shown, render)
onMounted(() => render(shown.value))

function pick(label: string) {
  picked.value = label
  const example = props.examples.find(item => item.label === label)
  if (example) text.value = example.source
}

function reset() {
  text.value = initial
  picked.value = props.examples[0]?.label
  fromLink.value = false
}

const root = useTemplateRef<HTMLElement>('root')
const link = useClipboard()
const fromLink = ref(false)

const hashKey = 'mdc-' + encodeURIComponent(props.stateKey)

function encode(value: string) {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function decode(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(base64)
  return new TextDecoder().decode(Uint8Array.from(binary, char => char.charCodeAt(0)))
}

const shareUrl = computed(() => {
  if (!import.meta.client) return ''
  const params = new URLSearchParams(location.hash.slice(1))
  params.set(hashKey, encode(text.value))
  return location.origin + location.pathname + location.search + '#' + params.toString()
})

const tooLong = computed(() => shareUrl.value.length > 8000)

function share() {
  link.copy(shareUrl.value)
}

onMounted(() => {
  const params = new URLSearchParams(location.hash.slice(1))
  const value = params.get(hashKey)
  if (!value) return
  try {
    text.value = decode(value)
    fromLink.value = true
    root.value?.scrollIntoView({ block: 'center' })
  } catch {
    fromLink.value = false
  }
})
</script>

<template>
  <div
    ref="root"
    class="my-6 rounded-lg ring ring-default"
  >
    <div class="flex flex-wrap items-center gap-2 border-b border-default p-3">
      <span
        v-if="title"
        class="mr-auto text-sm font-medium text-highlighted"
      >
        {{ title }}
      </span>
      <USelectMenu
        v-if="examples.length > 1"
        :model-value="picked"
        :items="exampleItems"
        value-key="value"
        size="sm"
        class="w-52"
        :placeholder="t('playground.examples')"
        :search-input="examples.length > 6 ? { placeholder: t('playground.search') } : false"
        @update:model-value="pick"
      />
      <UButton
        size="sm"
        color="neutral"
        variant="outline"
        :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
        :label="t('playground.copy')"
        @click="copy(text)"
      />
      <UButton
        size="sm"
        color="neutral"
        variant="outline"
        :icon="link.copied.value ? 'i-lucide-check' : 'i-lucide-link'"
        :label="t('playground.share')"
        :disabled="tooLong"
        @click="share"
      />
      <UButton
        size="sm"
        color="neutral"
        variant="ghost"
        icon="i-lucide-rotate-ccw"
        :label="t('common.reset')"
        @click="reset"
      />
    </div>

    <div class="grid gap-px bg-default md:grid-cols-2">
      <div class="space-y-2 bg-default p-3">
        <p class="text-xs font-semibold uppercase text-muted">
          {{ t('playground.source') }}
        </p>
        <UTextarea
          id="source"
          v-model="text"
          :rows="rows"
          class="w-full"
          :ui="{ base: 'font-mono text-sm' }"
        />
      </div>

      <div class="space-y-2 bg-default p-3">
        <p class="text-xs font-semibold uppercase text-muted">
          {{ t('playground.preview') }}
        </p>
        <UAlert
          v-if="failure"
          color="error"
          variant="subtle"
          :title="t('playground.error')"
          :description="failure"
        />
        <ClientOnly>
          <MDCRenderer
            v-if="parsed"
            :key="version"
            :body="parsed.body"
            :data="parsed.data"
            :components="components"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
