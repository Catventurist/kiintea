<script setup lang="ts">
const { t } = useI18n()
const toast = useToast()
const { pageKey, current, others, count, download, importFile, clear } = useNotes()

const fileInput = ref<HTMLInputElement | null>(null)
const confirming = ref(false)
let confirmTimer: ReturnType<typeof setTimeout> | undefined

function pickFile() {
  fileInput.value?.click()
}

async function onFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  try {
    const total = await importFile(file)
    toast.add({
      id: 'notes-import',
      title: total ? t('notes.imported', { count: total }) : t('notes.importFailed'),
      icon: total ? 'i-lucide-check' : 'i-lucide-circle-alert',
      color: total ? 'success' : 'warning'
    })
  } catch {
    toast.add({
      id: 'notes-import',
      title: t('notes.importFailed'),
      icon: 'i-lucide-circle-alert',
      color: 'error'
    })
  } finally {
    input.value = ''
  }
}

function onClear() {
  if (!confirming.value) {
    confirming.value = true
    confirmTimer = setTimeout(() => {
      confirming.value = false
    }, 3000)
    return
  }
  clearTimeout(confirmTimer)
  confirming.value = false
  clear()
}

onBeforeUnmount(() => clearTimeout(confirmTimer))
</script>

<template>
  <UPopover :content="{ align: 'end' }">
    <UChip
      :show="count > 0"
      :text="count"
      size="3xl"
      color="primary"
    >
      <UButton
        icon="i-lucide-sticky-note"
        color="neutral"
        variant="ghost"
        :aria-label="t('notes.title')"
      />
    </UChip>

    <template #content>
      <div class="flex w-80 flex-col gap-3 p-4">
        <div class="flex flex-col gap-1">
          <p class="text-sm font-semibold text-highlighted">
            {{ t('notes.title') }}
          </p>
          <p class="text-xs text-muted">
            {{ t('notes.current') }}: {{ pageKey }}
          </p>
        </div>

        <UTextarea
          id="note"
          v-model="current"
          :placeholder="t('notes.placeholder')"
          :aria-label="t('notes.placeholder')"
          :rows="5"
          :maxrows="12"
          autoresize
        />

        <div
          v-if="others.length"
          class="flex flex-col gap-1"
        >
          <p class="text-xs font-semibold text-muted">
            {{ t('notes.other') }}
          </p>
          <ul class="flex max-h-32 flex-col gap-0.5 overflow-y-auto">
            <li
              v-for="entry in others"
              :key="entry.path"
            >
              <ULink
                :to="entry.path"
                class="block truncate text-sm text-primary"
              >
                {{ entry.path }}
              </ULink>
            </li>
          </ul>
        </div>

        <p
          v-else-if="!current.trim()"
          class="text-xs text-muted"
        >
          {{ t('notes.empty') }}
        </p>

        <p class="text-xs text-muted">
          {{ t('notes.hint') }}
        </p>

        <div class="flex flex-wrap items-center gap-2">
          <UButton
            size="sm"
            icon="i-lucide-download"
            variant="soft"
            :label="t('notes.download')"
            :disabled="count === 0"
            @click="download"
          />
          <UButton
            size="sm"
            color="neutral"
            variant="outline"
            icon="i-lucide-upload"
            :label="t('notes.import')"
            @click="pickFile"
          />
          <UButton
            class="ml-auto"
            size="sm"
            :color="confirming ? 'error' : 'neutral'"
            variant="ghost"
            icon="i-lucide-trash-2"
            :label="confirming ? t('notes.clearConfirm') : t('notes.clear')"
            :disabled="count === 0"
            @click="onClear"
          />
        </div>

        <input
          ref="fileInput"
          type="file"
          accept=".txt,text/plain"
          class="hidden"
          @change="onFile"
        >
      </div>
    </template>
  </UPopover>
</template>
