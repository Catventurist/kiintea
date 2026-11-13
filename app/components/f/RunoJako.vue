<script setup lang="ts">
const props = withDefaults(defineProps<{
  content?: string
  blob?: string
  tabs?: boolean
}>(), {
  content: '',
  blob: '',
  tabs: true
})

const emit = defineEmits<{ decrypted: [string] }>()
const { t } = useI18n()
const localePath = useLocalePath()

const mode = ref<'create' | 'avaa'>(
  !props.blob && (props.content || !props.tabs) ? 'create' : 'avaa'
)

const source = ref(props.content)
const mdTitle = ref('')

const mdSnippet = computed(() =>
  encrypted.value
    ? `---\ntitle: ${JSON.stringify(mdTitle.value || 'Nimetön')}\nencrypted: true\nblob: ${encrypted.value}\n---\n`
    : ''
)
watch(source, () => {
  encrypted.value = ''
  runoPath.value = ''
  inputKey.value = ''
  error.value = ''
})

const encrypted = ref('')
const runoPath = ref('')
const inputBlob = ref(props.blob)
const inputKey = ref('')
const decrypted = ref('')
const error = ref('')
const loading = ref(false)

const tabItems = computed(() => [
  { label: t('runo.create'), value: 'create', icon: 'i-lucide-plus' },
  { label: t('runo.open'), value: 'avaa', icon: 'i-lucide-unlock' }
])

const NOM = ['kalevi', 'karhu', 'sampo', 'ilmari', 'aino', 'leivo', 'tuuri', 'voitto']
const GEN = ['karhun', 'kalevan', 'sammon', 'tuulen', 'meren', 'maan', 'tulen', 'rauhan']
const PART = ['marjan', 'soran', 'tervaa', 'vettä', 'heinää', 'karjaa', 'ruokaa', 'soraa']
const ILL = ['tuonelaan', 'kaivoon', 'saraan', 'maahan', 'mereen', 'metsään', 'taivahan', 'kalaan']
const VERB = ['otti', 'antoi', 'vei', 'loi', 'räjähti', 'käski', 'sanoi', 'laski']

function toB64(u8: Uint8Array): string {
  let s = ''
  for (let i = 0; i < u8.length; i += 0x8000) {
    s += String.fromCharCode(...u8.subarray(i, i + 0x8000))
  }
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromB64(str: string): Uint8Array<ArrayBuffer> {
  const b64 = str.trim().replace(/-/g, '+').replace(/_/g, '/')
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4)
  return Uint8Array.from(atob(padded), c => c.charCodeAt(0))
}

function pick<T>(arr: T[]): T {
  const i = new Uint32Array(1)
  crypto.getRandomValues(i)
  return arr[i[0]! % arr.length]!
}

function generateRuno(): string {
  return `${pick(NOM)}-${pick(VERB)}-${pick(GEN)}-${pick(PART)}-${pick(ILL)}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

async function createShare() {
  error.value = ''
  loading.value = true
  try {
    const body = source.value.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
    const key = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']
    )
    const iv = crypto.getRandomValues(new Uint8Array(12))
    const enc = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv }, key, new TextEncoder().encode(body)
    )
    const blob = new Uint8Array(iv.length + enc.byteLength)
    blob.set(iv, 0)
    blob.set(new Uint8Array(enc), iv.length)
    const raw = new Uint8Array(await crypto.subtle.exportKey('raw', key))
    encrypted.value = toB64(blob)
    runoPath.value = generateRuno()
    inputKey.value = toB64(raw)
  } catch {
    error.value = t('runo.encryption_failed')
  } finally {
    loading.value = false
  }
}

async function openShare() {
  error.value = ''
  decrypted.value = ''
  loading.value = true
  try {
    const blob = fromB64(inputBlob.value)
    const iv = blob.slice(0, 12)
    const ciphertext = blob.slice(12)
    const key = await crypto.subtle.importKey(
      'raw', fromB64(inputKey.value), { name: 'AES-GCM' }, false, ['decrypt']
    )
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext)
    decrypted.value = new TextDecoder().decode(plain)
    emit('decrypted', decrypted.value)
  } catch {
    error.value = t('runo.decryption_failed')
  } finally {
    loading.value = false
  }
}

function copy(text: string) {
  navigator.clipboard.writeText(text)
}

const sharePath = computed(() =>
  localePath(`/runo/${runoPath.value}`).replace(/\/{2,}/g, '/')
)

const shareHash = computed(() => `#k=${inputKey.value}&d=${encrypted.value}`)

function copyLink() {
  copy(`${location.origin}${sharePath.value}${shareHash.value}`)
}

onMounted(() => {
  const params = new URLSearchParams(location.hash.slice(1))
  const k = params.get('k')
  const d = params.get('d')
  if (k) {
    inputKey.value = k
    if (d) inputBlob.value = d
    mode.value = 'avaa'
    history.replaceState(null, '', location.pathname + location.search)
  }
})
</script>

<template>
  <div class="max-w-lg mx-auto">
    <UTabs
      v-if="tabs && !blob"
      v-model="mode"
      variant="link"
      :items="tabItems"
      default-value="create"
      class="mb-6"
    />

    <div
      v-if="mode === 'create' && !blob"
      class="space-y-4"
    >
      <UFormField
        name="source"
        :label="t('runo.content')"
      >
        <UTextarea
          v-model="source"
          name="source"
          :rows="8"
          class="w-full font-mono text-xs"
        />
      </UFormField>

      <UButton
        :label="t('runo.encrypt_and_create')"
        icon="i-lucide-shield"
        color="primary"
        size="lg"
        block
        :loading="loading"
        :disabled="!source.trim()"
        @click="createShare"
      />

      <UAlert
        v-if="error"
        :title="error"
        variant="soft"
        color="error"
        icon="i-lucide-x-circle"
        class="text-sm"
      />

      <div
        v-if="encrypted"
        class="space-y-4"
      >
        <UAlert
          :title="t('runo.created')"
          variant="soft"
          color="success"
          icon="i-lucide-check-circle-2"
        />

        <UFormField
          name="runo-linkki"
          :label="t('runo.link')"
        >
          <div class="flex gap-2 w-full">
            <UInput
              name="runo-linkki"
              :model-value="sharePath"
              readonly
              class="flex-1 font-mono text-xs"
            />
            <UButton
              icon="i-lucide-copy"
              color="neutral"
              variant="outline"
              size="sm"
              :aria-label="t('runo.link')"
              @click="copyLink"
            />
          </div>
        </UFormField>

        <UFormField
          name="runo-avain"
          :label="t('runo.key')"
        >
          <div class="flex gap-2">
            <UInput
              name="runo-avain"
              :model-value="inputKey"
              readonly
              class="flex-1 font-mono text-xs"
            />
            <UButton
              icon="i-lucide-copy"
              color="neutral"
              variant="outline"
              size="sm"
              :aria-label="t('runo.key')"
              @click="copy(inputKey)"
            />
          </div>
        </UFormField>
        <UFormField
          name="md-title"
          :label="t('runo.md_title')"
        >
          <UInput
            v-model="mdTitle"
            name="md-title"
            class="w-full"
          />
        </UFormField>
        <UFormField
          name="runo-blob"
          :label="t('runo.data')"
        >
          <div class="flex gap-2">
            <UInput
              name="runo-blob"
              :model-value="encrypted"
              readonly
              class="flex-1 font-mono text-xs"
            />
            <UButton
              icon="i-lucide-copy"
              color="neutral"
              variant="outline"
              size="sm"
              :aria-label="t('runo.data')"
              @click="copy(encrypted)"
            />
          </div>
        </UFormField>

        <UFormField
          name="md-snippet"
          :label="t('runo.md_file')"
        >
          <div class="flex gap-2">
            <UTextarea
              name="md-snippet"
              :model-value="mdSnippet"
              readonly
              :rows="6"
              class="flex-1 font-mono text-xs"
            />
            <UButton
              icon="i-lucide-copy"
              color="neutral"
              variant="outline"
              size="sm"
              :aria-label="t('runo.md_file')"
              @click="copy(mdSnippet)"
            />
          </div>
        </UFormField>

        <UAlert
          :title="t('runo.key_warning')"
          variant="soft"
          color="warning"
          icon="i-lucide-shield-alert"
          class="text-sm"
        />
      </div>
    </div>

    <div
      v-else
      class="space-y-4"
    >
      <UFormField
        v-if="!blob"
        name="tiedot"
        :label="t('runo.data')"
      >
        <UTextarea
          v-model="inputBlob"
          name="tiedot"
          :placeholder="t('runo.data_placeholder')"
          :rows="3"
          class="w-full font-mono text-xs"
        />
      </UFormField>

      <UFormField
        name="avain"
        :label="t('runo.key')"
      >
        <UInput
          v-model="inputKey"
          name="avain"
          :placeholder="t('runo.key_placeholder')"
          class="w-full font-mono text-xs"
        />
      </UFormField>

      <UButton
        :label="t('runo.open_runo')"
        icon="i-lucide-lock-open"
        color="primary"
        size="lg"
        block
        :loading="loading"
        :disabled="!inputBlob || !inputKey"
        @click="openShare"
      />

      <UAlert
        v-if="error"
        :title="error"
        variant="soft"
        color="error"
        icon="i-lucide-x-circle"
        class="text-sm"
      />

      <div
        v-if="decrypted"
        class="mt-6"
      >
        <UAlert
          :title="t('runo.opened')"
          variant="soft"
          color="success"
          icon="i-lucide-lock-open"
          class="mb-4 text-sm"
        />
        <MDC :value="decrypted" />
      </div>
    </div>
  </div>
</template>
