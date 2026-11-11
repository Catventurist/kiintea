<script setup lang="ts">
const { locales, setLocale } = useI18n()
const locale = useRouteLocale()

type AppLocale = { code: string, name: string, icon: string }

const items = computed(() => locales.value as AppLocale[])
const current = computed(() => items.value.find(l => l.code === locale.value))

const open = ref(false)

function select(code: string) {
  setLocale(code as typeof locale.value)
  open.value = false
}
</script>

<template>
  <UPopover
    v-model:open="open"
    mode="hover"
    :content="{ align: 'end' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      square
      :icon="current?.icon"
      :aria-label="current?.name"
      :ui="{ leadingIcon: 'size-5' }"
    />

    <template #content>
      <div class="p-1 flex flex-col gap-0.5 min-w-30">
        <UButton
          v-for="l in items"
          :key="l.code"
          :icon="l.icon"
          :label="l.name"
          color="neutral"
          :variant="l.code === locale ? 'soft' : 'ghost'"
          :ui="{ leadingIcon: 'size-5' }"
          class="justify-start"
          @click="select(l.code)"
        />
      </div>
    </template>
  </UPopover>
</template>
