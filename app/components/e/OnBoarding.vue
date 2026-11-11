<script setup lang="ts">
import { useOnboarding, type Preference } from '~/composables/useOnboarding'

type AppLocale = 'en' | 'fi'
type Mode = 'light' | 'dark'

interface OnboardingPrefs {
  priority: Preference
  locale: AppLocale
  mode: Mode
}

const { t: translate, locale: currentLocale, loadLocaleMessages } = useI18n()
const colorMode = useColorMode()
const { complete } = useOnboarding()

const completed = useState<boolean>('onboarding-completed', () => false)
const prefs = useState<OnboardingPrefs | null>('onboarding-prefs', () => null)
const priority = ref<Preference>('both')
const locale = ref<AppLocale>(currentLocale.value as AppLocale)

const mode = computed<Mode>({
  get: () => (colorMode.value === 'dark' ? 'dark' : 'light'),
  set: (value) => { colorMode.preference = value }
})

const tones = {
  info: {
    on: 'bg-info/10 ring-2 ring-info',
    off: 'ring ring-default hover:bg-info/10',
    icon: 'text-info'
  },
  secondary: {
    on: 'bg-secondary/10 ring-2 ring-secondary',
    off: 'ring ring-default hover:bg-secondary/10',
    icon: 'text-secondary'
  },
  success: {
    on: 'bg-success/10 ring-2 ring-success',
    off: 'ring ring-default hover:bg-success/10',
    icon: 'text-success'
  }
} as const

const cards = [
  { value: 'language', label: 'onboarding.language', icon: 'i-lucide-languages', tone: 'info', locale: true, mode: false, wide: false },
  { value: 'darkmode', label: 'onboarding.darkmode', icon: 'i-lucide-moon', tone: 'secondary', locale: false, mode: true, wide: false },
  { value: 'both', label: 'onboarding.both', icon: 'i-lucide-sparkles', tone: 'success', locale: false, mode: false, wide: true }
] as const

const locales: { value: AppLocale, label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'fi', label: 'FI' }
]

const modes = [
  { value: 'light', label: 'onboarding.light', icon: 'i-lucide-sun' },
  { value: 'dark', label: 'onboarding.dark', icon: 'i-lucide-moon' }
] as const

function t(key: string) {
  return translate(key, {}, { locale: locale.value })
}

async function pickLocale(value: AppLocale) {
  await loadLocaleMessages(value)
  locale.value = value
}

function submit() {
  prefs.value = {
    priority: priority.value,
    locale: locale.value,
    mode: mode.value
  }
  complete(priority.value, { locale: locale.value, mode: mode.value })
  completed.value = true
}
</script>

<template>
  <Transition
    name="onboarding"
    appear
  >
    <div>
      <h2
        v-if="completed"
        class="text-4xl text-primary animate-quiz-pop self-center"
      >
        {{ $t('onboarding.success') }}
      </h2>
      <UCard
        v-if="!completed"
        class="min-w-xs mx-auto"
      >
        <template #header>
          <span class="text-xl text-primary font-bold">
            {{ t('onboarding.welcome') }}
          </span>
        </template>

        <div class="space-y-4">
          <p class="text-sm font-medium text-highlighted">
            {{ t('onboarding.question') }}
          </p>

          <div
            role="radiogroup"
            :aria-label="t('onboarding.question')"
            class="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            <div
              v-for="card in cards"
              :key="card.value"
              role="radio"
              tabindex="0"
              :aria-checked="priority === card.value"
              class="rounded-lg p-4 cursor-pointer select-none transition"
              :class="[
                priority === card.value ? tones[card.tone].on : tones[card.tone].off,
                card.wide && 'sm:col-span-2'
              ]"
              @click="priority = card.value"
              @keydown.enter.prevent="priority = card.value"
              @keydown.space.prevent="priority = card.value"
            >
              <div class="flex items-center gap-2 font-medium text-highlighted">
                <UIcon
                  :name="card.icon"
                  class="size-5"
                  :class="tones[card.tone].icon"
                />
                {{ t(card.label) }}
              </div>

              <div
                v-if="card.locale || card.mode"
                class="mt-3 flex flex-wrap gap-2"
              >
                <template v-if="card.locale">
                  <UButton
                    v-for="l in locales"
                    :key="l.value"
                    :color="card.tone"
                    :variant="locale === l.value ? 'soft' : 'outline'"
                    :label="l.label"
                    @click="pickLocale(l.value)"
                  />
                </template>

                <template v-if="card.mode">
                  <UBadge
                    v-for="m in modes"
                    :key="m.value"
                    as="button"
                    type="button"
                    :color="card.tone"
                    :variant="mode === m.value ? 'solid' : 'outline'"
                    :icon="m.icon"
                    :label="t(m.label)"
                    @click="mode = m.value"
                  />
                </template>
              </div>
            </div>
          </div>

          <UButton
            block
            variant="subtle"
            trailing-icon="i-lucide-arrow-right"
            :label="t('onboarding.continue')"
            @click="submit"
          />
        </div>
      </UCard>
    </div>
  </Transition>
</template>
