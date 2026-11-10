<script setup lang="ts">
import type { ViikotEnCollectionItem, ViikotFiCollectionItem } from '@nuxt/content'

type Viikko = ViikotEnCollectionItem | ViikotFiCollectionItem
type Juttu = Viikko['jutut'][number]

const props = defineProps<{ viikko: Viikko }>()

const { t } = useI18n()
const päivät = ['ma', 'ti', 'ke', 'to', 'pe', 'la', 'su'] as const

const tilaVäri = {
  käynnissä: 'primary',
  valmis: 'success',
  varastoitu: 'neutral'
} as const

const solunLuokka = {
  primary: 'bg-primary/10',
  secondary: 'bg-secondary/10',
  success: 'bg-success/10',
  info: 'bg-info/10',
  warning: 'bg-warning/10',
  error: 'bg-error/10',
  neutral: 'bg-neutral/10'
} as const

const { herkku, osumaprosentti } = useViikkoTulos(() => props.viikko)

const merkintä = (j: Juttu, p: typeof päivät[number]) =>
  j.päivät?.find(x => x.päivä === p)

const edistyminen = (j: Juttu) =>
  Math.round(((j.päivät?.length ?? 0) / 7) * 100)

const päättelyTeksti = computed(() => {
  const nimi = t(`viikot.päättely.${props.viikko.päättely}`)
  return props.viikko.kuorum
    ? `${nimi} (${t('viikot.viikko.kuorum', { n: props.viikko.kuorum })})`
    : nimi
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between gap-2">
        <div>
          <h3 class="font-semibold text-highlighted">
            {{ t('viikot.viikko.otsikko', { n: viikko.viikko }) }} · {{ viikko.kääre }}
          </h3>
          <p class="text-sm text-muted">
            {{ päättelyTeksti }}
          </p>
        </div>
        <UBadge
          :color="(tilaVäri[viikko.tila])"
          variant="subtle"
          :label="t(`viikot.tila.${viikko.tila}`)"
        />
      </div>
    </template>

    <div class="space-y-4">
      <div
        v-for="juttu in viikko.jutut"
        :key="juttu.nimi"
        class="space-y-2"
      >
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <UBadge
              :color="herkku ? 'success' : 'neutral'"
              variant="subtle"
              :icon="herkku ? 'i-lucide-cookie' : 'i-lucide-lock'"
              :label="herkku ? 'Treat unlocked' : `${Math.round(osumaprosentti * 100)} %`"
            />
            <UBadge
              :color="tilaVäri[viikko.tila]"
              variant="subtle"
              :label="t(`viikot.tila.${viikko.tila}`)"
            />
          </div>
          <span class="text-xs text-muted">{{ edistyminen(juttu) }} %</span>
        </div>

        <p
          v-if="juttu.miksi"
          class="text-sm text-muted"
        >
          {{ juttu.miksi }}
        </p>

        <div class="grid grid-cols-7 gap-1">
          <div
            v-for="päivä in päivät"
            :key="päivä"
            class="text-center text-xs rounded-md py-1.5 border border-default"
            :class="merkintä(juttu, päivä) ? [solunLuokka[juttu.väri], 'text-highlighted'] : 'text-muted'"
            :title="merkintä(juttu, päivä)?.muistiinpano"
          >
            <div>{{ t(`viikot.päivä.${päivä}`) }}</div>
            <div class="font-semibold">
              {{ merkintä(juttu, päivä)?.arvio ?? (merkintä(juttu, päivä) ? '✓' : '·') }}
            </div>
          </div>
        </div>

        <UProgress
          :model-value="edistyminen(juttu)"
          :color="juttu.väri"
          size="xs"
        />
      </div>
    </div>
  </UCard>
</template>
