<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

const props = withDefaults(defineProps<{
  colors?: string[]
  select?: boolean
  compact?: boolean
}>(), {
  colors: () => ['blue', 'sky', 'indigo', 'violet', 'green', 'emerald', 'amber', 'orange', 'rose', 'suomi', 'lake'],
  select: true,
  compact: false
})

const appConfig = useAppConfig()
const { t } = useI18n()

const list = ref<string[]>([...props.colors])
const container = useTemplateRef<HTMLElement>('container')

const current = computed(() => appConfig.ui.colors.primary)

function pick(name: string) {
  if (props.select) appConfig.ui.colors.primary = name
}

useSortable(container, list, {
  animation: 150,
  draggable: '[data-swatch]',
  ghostClass: 'opacity-60',
  forceFallback: true,
  fallbackOnBody: true,
  fallbackTolerance: 3
})
</script>

<template>
  <div
    ref="container"
    class="flex flex-wrap"
  >
    <div
      v-for="name in list"
      :key="name"
      data-swatch
      class="cursor-grab select-none active:cursor-grabbing"
      :class="compact ? 'p-0.5' : 'p-1'"
    >
      <button
        type="button"
        :aria-label="`${t('common.use.primary')} (${name})`"
        :title="name"
        class="relative flex items-center justify-center ring-offset-default transition-shadow"
        :class="[
          compact ? 'size-6 rounded-md ring-offset-1' : 'size-12 rounded-lg ring-offset-2',
          select && current === name ? 'ring-2 ring-default' : ''
        ]"
        :style="{ backgroundColor: `var(--swatch-${name}, var(--color-${name}-500))` }"
        @click="pick(name)"
      >
        <UIcon
          v-if="select && current === name"
          name="i-lucide-check"
          class="text-white"
          :class="compact ? 'size-3.5' : 'size-5'"
        />
      </button>
      <p
        v-if="!compact"
        class="mt-1 text-center text-xs text-muted"
      >
        {{ name }}
      </p>
    </div>
  </div>
</template>
