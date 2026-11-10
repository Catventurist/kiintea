<script setup lang="ts">
const { t } = useI18n()
const { options, set } = usePageOptions()

const keys = ['sidebar', 'collapsed', 'toc', 'splitter', 'surround'] as const

const items = computed(() => [
  [{ label: t('pageOptions.title'), type: 'label' as const }],
  keys.map(key => ({
    label: t(`pageOptions.${key}`),
    type: 'checkbox' as const,
    checked: options.value[key],
    onUpdateChecked(checked: boolean) {
      set(key, checked)
    },
    onSelect(e: Event) {
      e.preventDefault()
    }
  }))
])
</script>

<template>
  <UDropdownMenu
    :items="items"
    :ui="{ content: 'min-w-46' }"
  >
    <UButton
      icon="i-lucide-sliders-horizontal"
      color="neutral"
      variant="ghost"
      :aria-label="t('pageOptions.title')"
    />
  </UDropdownMenu>
</template>
