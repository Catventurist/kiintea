<script setup lang="ts">
import type { FileUploadItem, TreeItem } from '@nuxt/ui'
import type { TreeItemSelectEvent } from 'reka-ui'

const { t } = useI18n()

const file = ref<File | FileUploadItem | null>()
const list = useTemplateRef<HTMLElement>('list')

const {
  selected,
  expanded,
  query,
  total,
  uploadId,
  reorder,
  filtered,
  selectedCount,
  getKey,
  load,
  selectAll,
  clearSelection,
  exportAll,
  exportSelected
} = useBookmarks(list)

async function onFile(f: File | FileUploadItem | null | undefined) {
  if (!(f instanceof File)) return
  if (!await load(f)) file.value = null
}

function onSelect(e: TreeItemSelectEvent<TreeItem>) {
  if (e.detail.originalEvent.type === 'click') e.preventDefault()
}
</script>

<template>
  <UFileUpload
    v-model="file"
    accept=".html"
    :label="t('bookmarks.upload.label')"
    :description="t('bookmarks.upload.description')"
    @update:model-value="onFile"
  />

  <div
    v-if="total"
    :key="uploadId"
    class="mt-4 space-y-4 animate-rise motion-reduce:animate-none"
  >
    <div class="flex gap-2">
      <UButton
        icon="i-lucide-download"
        color="neutral"
        variant="outline"
        :label="t('bookmarks.downloadAll', { total })"
        class="flex-1"
        @click="exportAll"
      />
      <UButton
        icon="i-lucide-download"
        :label="t('bookmarks.downloadSelected', { count: selectedCount })"
        :disabled="!selectedCount"
        class="flex-1"
        @click="exportSelected"
      />
    </div>

    <div class="flex gap-2">
      <UInput
        id="bookmarks"
        v-model="query"
        icon="i-lucide-search"
        :placeholder="t('bookmarks.search')"
        class="flex-1"
      >
        <template
          v-if="query"
          #trailing
        >
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="link"
            size="sm"
            :aria-label="t('bookmarks.clearSearch')"
            @click="query = ''"
          />
        </template>
      </UInput>
      <UButton
        color="neutral"
        variant="outline"
        :label="t('bookmarks.selectAll')"
        @click="selectAll"
      />
      <UButton
        color="neutral"
        variant="outline"
        :label="t('bookmarks.clear')"
        :disabled="!selected.length"
        @click="clearSelection"
      />
    </div>

    <USwitch
      v-model="reorder"
      :label="t('bookmarks.reorder')"
      :disabled="!!query"
    />

    <p
      v-if="!filtered.length"
      class="text-sm text-muted"
    >
      {{ t('bookmarks.noResults') }}
    </p>

    <UTree
      v-else
      ref="list"
      v-model="selected"
      v-model:expanded="expanded"
      :items="filtered"
      :get-key="getKey"
      :as="{ link: 'div' }"
      :nested="!reorder"
      :virtualize="!reorder"
      :unmount-on-hide="!reorder"
      multiple
      propagate-select
      bubble-select
      class="w-2xl h-96 overflow-y-auto"
      @select="onSelect"
    >
      <template #item-leading="{ selected: isSelected, indeterminate, handleSelect }">
        <UCheckbox
          :model-value="indeterminate ? 'indeterminate' : isSelected"
          tabindex="-1"
          @change="handleSelect"
          @click.stop
        />
      </template>

      <template #item-label="{ item }">
        <span class="truncate">{{ item.label }}</span>
        <UButton
          v-if="item.url"
          :to="item.url"
          :aria-label="t('bookmarks.openLink')"
          target="_blank"
          icon="i-lucide-external-link"
          color="neutral"
          variant="ghost"
          size="xs"
          class="ml-2"
          @click.stop
        />
      </template>
    </UTree>
  </div>
</template>
