<script setup lang="ts">
const { locale, setLocale, t } = useI18n()
const colorMode = useColorMode()
const { options } = usePageOptions()
const { preferences } = usePreferences()
const toast = useToast()

function exportYaml() {
  const data = {
    ...options.value,
    locale: locale.value,
    colorMode: colorMode.preference
  }
  const blob = new Blob([toYaml(data)], { type: 'text/yaml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'settings.yml'
  a.click()
  URL.revokeObjectURL(url)
}

async function importYaml(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const { preferences: prefs, choices } = fromYaml(await file.text())
  preferences.value = prefs

  if (choices.colorMode) colorMode.preference = choices.colorMode as ColorModePreference
  if (choices.locale) await setLocale(choices.locale as LocaleCode)

  toast.add({ title: t('settingsFile.imported'), icon: 'i-lucide-check' })
}
</script>

<template>
  <div class="flex gap-2">
    <UButton
      :label="t('settingsFile.export')"
      icon="i-lucide-download"
      variant="outline"
      @click="exportYaml"
    />
    <UButton
      :label="t('settingsFile.import')"
      icon="i-lucide-upload"
      color="neutral"
      variant="subtle"
      as="label"
    >
      <input
        type="file"
        accept=".yml,.yaml"
        class="sr-only"
        @change="importYaml"
      >
    </UButton>
  </div>
</template>
