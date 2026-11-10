export type Preference = 'language' | 'darkmode' | 'both'
type Locale = Parameters<ReturnType<typeof useI18n>['setLocale']>[0]

export function useOnboarding() {
  const colorMode = useColorMode()
  const { setLocale } = useI18n()

  const done = ref(false)

  function complete(choice: Preference, values: { locale?: Locale, mode?: 'light' | 'dark' }) {
    if (choice === 'language' || choice === 'both') {
      if (values.locale) setLocale(values.locale)
    }
    if (choice === 'darkmode' || choice === 'both') {
      if (values.mode) colorMode.preference = values.mode
    }
    done.value = true
  }

  return { done, complete }
}
