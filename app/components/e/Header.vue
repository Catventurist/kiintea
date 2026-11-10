<script setup lang="ts">
const { t } = useI18n()
const { navItems } = useNavItems()
</script>

<template>
  <UHeader
    mode="drawer"
    to="/"
    :ui="{ root: 'fixed inset-x-0 bottom-0 top-auto border-b-0 border-t' }"
  >
    <LazyUNavigationMenu
      :items="navItems"
      hydrate-on-idle
    />

    <template #title>
      <div class="group flex flex-row items-center gap-1">
        <UIcon
          name="i-lucide-sigma"
          class="size-6 text-primary duration-300 group-hover:text-secondary"
        />
        <span class="text-secondary duration-300 group-hover:text-primary">
          {{ t('site.title') }}
        </span>
      </div>
    </template>

    <template #right>
      <LazyUContentSearchButton
        :collapsed="false"
        hydrate-on-idle
      />
      <LazyLocaleMenu />
      <LazyEOptionsButton />
      <LazyUColorModeButton variant="ghost" />
    </template>

    <template #body>
      <LazyUNavigationMenu
        :items="navItems"
        orientation="vertical"
        class="-mx-2.5"
        hydrate-on-idle
      />
    </template>
  </UHeader>
</template>
