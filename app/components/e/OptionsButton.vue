<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const colorMode = useColorMode()
const { options, set } = usePageOptions()

const keys = ['sidebar', 'toc', 'collapsed', 'splitter', 'surround'] as const

const localeItems = computed(() => preferenceChoices.locale.map(code => ({
  label: code.toUpperCase(),
  value: code
})))

const colorModeItems = computed(() => preferenceChoices.colorMode.map(mode => ({
  label: t(`pageOptions.${mode}`),
  value: mode
})))
</script>

<template>
  <UPopover :content="{ align: 'end' }">
    <UButton
      icon="i-lucide-sliders-horizontal"
      color="neutral"
      variant="ghost"
      :aria-label="t('pageOptions.title')"
    />

    <template #content>
      <div class="flex w-72 flex-col gap-4 p-4">
        <p class="text-sm font-semibold text-highlighted">
          {{ t('pageOptions.title') }}
        </p>

        <div class="flex flex-col gap-3">
          <USwitch
            v-for="key in keys"
            :key="key"
            :label="t(`pageOptions.${key}`)"
            :model-value="options[key]"
            @update:model-value="set(key, $event)"
          />
        </div>

        <USeparator />

        <div class="flex flex-col gap-3">
          <UFormField :label="t('pageOptions.language')">
            <USelect
              :model-value="locale"
              :items="localeItems"
              class="w-full"
              @update:model-value="setLocale($event as LocaleCode)"
            />
          </UFormField>

          <UFormField :label="t('pageOptions.theme')">
            <USelect
              :model-value="(colorMode.preference as ColorModePreference)"
              :items="colorModeItems"
              class="w-full"
              @update:model-value="colorMode.preference = ($event as ColorModePreference)"
            />
            <SwatchList
              compact
              class="mt-2"
            />
          </UFormField>
        </div>

        <USeparator />

        <ESettingsFile />
      </div>
    </template>
  </UPopover>
</template>
