<script setup lang="ts">
const { t } = useI18n()
const { vaihda, virhe, valmis } = useVaihdaSalasana()

const viikko = ref<number>()
const vanha = ref('')
const uusi = ref('')
const toisto = ref('')

const kelpaa = computed(() =>
  !!viikko.value && !!vanha.value && !!uusi.value && uusi.value === toisto.value && uusi.value !== vanha.value
)
const eiTäsmää = computed(() => !!toisto.value && uusi.value !== toisto.value)

const kuormassa = ref(false)

async function vaihdaKäsin() {
  kuormassa.value = true
  await vaihda({ viikko: viikko.value!, vanha: vanha.value, uusi: uusi.value })
  kuormassa.value = false
}

function tyhjennä() {
  viikko.value = undefined
  vanha.value = ''
  uusi.value = ''
  toisto.value = ''
}
</script>

<template>
  <div class="space-y-2">
    <div class="flex flex-wrap items-center gap-2">
      <UInputNumber
        id="week"
        v-model="viikko"
        :min="1"
        :placeholder="t('viikot.dev.week')"
      />
      <UInput
        v-model="vanha"
        type="password"
        name="old-passphrase"
        :placeholder="t('viikot.dev.oldPassphrase')"
      />
      <UInput
        v-model="uusi"
        type="password"
        name="new-passphrase"
        :placeholder="t('viikot.dev.newPassphrase')"
      />
      <UInput
        v-model="toisto"
        type="password"
        name="new-passphrase-confirm"
        :placeholder="t('viikot.dev.newPassphraseAgain')"
        :color="eiTäsmää ? 'error' : 'primary'"
      />
      <UButton
        :label="t('viikot.dev.change')"
        icon="i-lucide-key-round"
        :loading="kuormassa"
        :disabled="!kelpaa"
        @click="vaihdaKäsin"
      />
      <UButton
        :label="t('viikot.dev.reset')"
        icon="i-lucide-rotate-ccw"
        variant="ghost"
        color="neutral"
        @click="tyhjennä"
      />
    </div>

    <p
      v-if="virhe"
      class="text-sm text-error"
    >
      {{ t(`viikot.dev.virhe.${virhe}`) }}
    </p>
    <p
      v-if="valmis"
      class="text-sm text-success"
    >
      {{ t('viikot.dev.done') }}
    </p>
  </div>
</template>
