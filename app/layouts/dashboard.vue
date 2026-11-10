<script setup lang="ts">
import type { NavigationMenuItem, SplitterItem } from '@nuxt/ui'
import type { ContentNavigationItem } from '@nuxt/content'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

const route = useRoute()
const { t } = useI18n()
const { navigation, page } = useContentCollection()
const { options, set } = usePageOptions()
const { reset } = usePreferences()

const open = computed({
  get: () => !options.value.collapsed,
  set: (value: boolean) => set('collapsed', !value)
})

watch(() => route.path, () => reset(), { flush: 'sync' })

const splitterItems: SplitterItem[] = [
  { slot: 'main', defaultSize: 75, minSize: 40, class: 'overflow-y-auto' },
  { slot: 'toc', defaultSize: 25, minSize: 15, maxSize: 40, class: 'overflow-y-auto' }
]

const breakpoints = useBreakpoints(breakpointsTailwind, { ssrWidth: 1280 })
const isDesktop = breakpoints.greaterOrEqual('lg')

const tocLinks = computed(() => page.value?.body?.toc?.links ?? [])
const hasToc = computed(() => options.value.toc && tocLinks.value.length > 0)
const showSplitter = computed(() => options.value.splitter && hasToc.value && isDesktop.value)
const showDesktopAside = computed(() => !showSplitter.value && hasToc.value && isDesktop.value)
const showMobileToc = computed(() => hasToc.value && !isDesktop.value)

function toMenu(items: ContentNavigationItem[], expanded: boolean): NavigationMenuItem[] {
  return items.map(item => ({
    label: item.title,
    icon: item.icon as string | undefined,
    to: item.path,
    children: expanded && item.children?.length
      ? toMenu(item.children, true)
      : undefined,
    defaultOpen: false
  }))
}
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <USidebar
      v-if="options.sidebar"
      v-model:open="open"
      collapsible="icon"
      rail
    >
      <template #default="{ state }">
        <LazyUNavigationMenu
          :collapsed="state === 'collapsed'"
          :items="toMenu(navigation, state === 'expanded')"
          orientation="vertical"
          :ui="{ link: 'p-1.5 overflow-hidden' }"
          hydrate-on-idle
        />
      </template>
    </USidebar>

    <div class="flex-1 min-w-0 min-h-0 flex flex-col">
      <div class="h-(--ui-header-height) shrink-0 flex items-center gap-2 px-4 border-b border-default">
        <UButton
          v-if="options.sidebar"
          icon="i-lucide-panel-left"
          color="neutral"
          variant="ghost"
          :aria-label="t('pageOptions.toggleSidebar')"
          :aria-expanded="open"
          @click="open = !open"
        />
        <ClientOnly>
          <LazyEOptionsButton />
          <LazyUColorModeButton variant="ghost" />
          <LazyENotesButton />
          <LazyEDownloadButton :page="page" />
          <LazyLocaleMenu />
          <LazyUContentSearchButton :collapsed="false" />
        </ClientOnly>
      </div>

      <div class="flex-1 min-h-0">
        <USplitter
          v-if="showSplitter"
          id="content-splitter"
          :items="splitterItems"
          class="h-full"
        >
          <template #main>
            <UScrollArea
              class="h-full px-6 pb-6"
              shadow
            >
              <slot />
            </UScrollArea>
          </template>
          <template #toc>
            <LazyUContentToc :links="tocLinks" />
          </template>
        </USplitter>

        <div
          v-else
          class="h-full flex"
        >
          <UScrollArea
            class="h-full flex-1 min-w-0 p-6"
            shadow
          >
            <LazyUContentToc
              v-if="showMobileToc"
              :links="tocLinks"
              :default-open="false"
              :ui="{ root: '-top-6 z-20 mx-0 px-0 sm:mx-0 sm:px-0 max-h-[60vh] backdrop-blur-sm' }"
              class="mb-6"
            />
            <slot />
          </UScrollArea>

          <aside
            v-if="showDesktopAside"
            class="w-64 shrink-0 overflow-y-auto p-6 border-s border-default"
          >
            <LazyUContentToc :links="tocLinks" />
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>
