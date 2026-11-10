<script setup lang="ts">
const { t } = useI18n()
const { tarkiste, luo, nollaa } = useTarkiste()

const suola = ref('')
const salasana = ref('')
const toisto = ref('')

const kelpaa = computed(() => !!suola.value && !!salasana.value && salasana.value === toisto.value)
const eiTäsmää = computed(() => !!toisto.value && salasana.value !== toisto.value)

async function kopioi() {
  await navigator.clipboard.writeText(tarkiste.value)
}

function tyhjennä() {
  suola.value = ''
  salasana.value = ''
  toisto.value = ''
  nollaa()
}
</script>

<template>
  <div class="space-y-2">
    <div class="flex flex-wrap items-center gap-2">
      <UInput
        v-model="suola"
        name="suola"
        :placeholder="t('viikot.dev.suola')"
      />
      <UInput
        v-model="salasana"
        type="password"
        name="new-passphrase"
        :placeholder="t('viikot.dev.passphrase')"
      />
      <UInput
        v-model="toisto"
        type="password"
        name="new-passphrase-confirm"
        :placeholder="t('viikot.dev.passphraseAgain')"
        :color="eiTäsmää ? 'error' : 'primary'"
      />
      <UButton
        :label="t('viikot.dev.generate')"
        :disabled="!kelpaa"
        @click="luo(salasana, suola)"
      />
      <UButton
        :label="t('viikot.dev.reset')"
        icon="i-lucide-rotate-ccw"
        variant="ghost"
        color="neutral"
        @click="tyhjennä"
      />
    </div>

    <div
      v-if="tarkiste"
      class="flex items-center gap-2"
    >
      <code class="text-xs break-all">tarkiste: {{ tarkiste }}</code>
      <UButton
        icon="i-lucide-copy"
        variant="ghost"
        color="neutral"
        size="xs"
        @click="kopioi"
      />
    </div>
  </div>
</template>
