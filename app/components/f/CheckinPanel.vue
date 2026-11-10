<script setup lang="ts">
const { t } = useI18n()
const { data, päivä, äänet, viikko, auki, väärä, herkku, tallenna, nollaaÄänet, avaa, lukitse, lataa, kopioi, tuo } = useCheckin()
const toast = useToast()
const salasana = ref('')
const kuormassa = ref(false)
const näytäTuonti = ref(false)
const tuontiTeksti = ref('')

const vaihtoehdot = [
  { arvo: 'ok', väri: 'success' },
  { arvo: 'osittain', väri: 'warning' },
  { arvo: 'ei', väri: 'error' }
] as const

const valittu = (i: number) => äänet.value[`${viikko}:${i}:${päivä}`]?.tulos
const onÄänii = computed(() => Object.keys(äänet.value).length > 0)

async function avaaKäsin() {
  kuormassa.value = true
  await avaa(salasana.value)
  kuormassa.value = false
  if (auki.value) salasana.value = ''
}

async function tuoKäsin() {
  const tulos = await tuo(tuontiTeksti.value)

  if ('virhe' in tulos) {
    toast.add({
      title: t(`viikot.checkin.importVirhe.${tulos.virhe}`),
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
    return
  }

  toast.add({
    title: t('viikot.checkin.importDone', { n: tulos.tuotu }),
    description: tulos.ohitettu ? t('viikot.checkin.importSkipped', { n: tulos.ohitettu }) : undefined,
    icon: 'i-lucide-check'
  })

  tuontiTeksti.value = ''
  näytäTuonti.value = false
}
</script>

<template>
  <UCard v-if="data">
    <template #header>
      <div class="flex items-center justify-between gap-2">
        <h3 class="font-semibold text-highlighted">
          {{ data.kääre }} · {{ t(`viikot.päivä.${päivä}`) }}
        </h3>
        <UBadge
          v-if="herkku !== null"
          :color="herkku ? 'success' : 'neutral'"
          variant="subtle"
          :icon="herkku ? 'i-lucide-cookie' : 'i-lucide-lock'"
          :label="herkku ? t('viikot.checkin.treatUnlocked') : t('viikot.checkin.notYet')"
        />
      </div>
    </template>

    <div class="space-y-3">
      <div
        v-for="(juttu, i) in data.jutut"
        :key="i"
        class="flex items-center justify-between gap-2"
      >
        <span class="font-medium text-highlighted">{{ juttu.nimi }}</span>
        <UFieldGroup>
          <UButton
            v-for="v in vaihtoehdot"
            :key="v.arvo"
            :label="t(`viikot.tulos.${v.arvo}`)"
            :color="v.väri"
            :variant="valittu(i) === v.arvo ? 'solid' : 'outline'"
            size="sm"
            @click="tallenna(i, v.arvo)"
          />
        </UFieldGroup>
      </div>
    </div>

    <template #footer>
      <div class="space-y-2">
        <div class="flex flex-wrap items-center gap-2">
          <template v-if="!auki">
            <UInput
              v-model="salasana"
              type="password"
              name="passphrase"
              :placeholder="t('viikot.checkin.passphrase')"
              :color="väärä ? 'error' : 'primary'"
              @keyup.enter="avaaKäsin"
            />
            <UButton
              :label="t('viikot.checkin.unlock')"
              icon="i-lucide-lock-open"
              :loading="kuormassa"
              :disabled="!salasana"
              @click="avaaKäsin"
            />
          </template>
          <template v-else>
            <UButton
              :label="t('viikot.checkin.download')"
              icon="i-lucide-download"
              variant="subtle"
              @click="lataa()"
            />
            <UButton
              :label="t('viikot.checkin.copy')"
              icon="i-lucide-copy"
              variant="subtle"
              @click="kopioi()"
            />
            <UButton
              :label="t('viikot.checkin.import')"
              icon="i-lucide-upload"
              variant="subtle"
              @click="näytäTuonti = !näytäTuonti"
            />
            <UButton
              :label="t('viikot.checkin.lock')"
              icon="i-lucide-lock"
              variant="ghost"
              color="neutral"
              @click="lukitse()"
            />
          </template>
          <UButton
            v-if="onÄänii"
            :label="t('viikot.checkin.reset')"
            icon="i-lucide-rotate-ccw"
            variant="ghost"
            color="error"
            @click="nollaaÄänet()"
          />
          <div
            v-if="auki && näytäTuonti"
            class="space-y-2"
          >
            <UTextarea
              v-model="tuontiTeksti"
              name="import"
              :rows="6"
              :placeholder="t('viikot.checkin.importPlaceholder')"
              class="w-full"
            />
            <UButton
              :label="t('viikot.checkin.importRun')"
              icon="i-lucide-check"
              :disabled="!tuontiTeksti.trim()"
              @click="tuoKäsin"
            />
          </div>
        </div>
        <p
          v-if="väärä"
          class="text-sm text-error"
        >
          {{ t('viikot.checkin.wrongPassphrase') }}
        </p>
      </div>
    </template>
  </UCard>
</template>
