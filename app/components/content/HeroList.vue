<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import { useSortable } from '@vueuse/integrations/useSortable'

const props = withDefaults(defineProps<{
  headline?: string
  title?: string
  description?: string
  links?: ButtonProps[]
  sections?: string[]
  sortable?: boolean
  stateKey?: string
}>(), {
  sections: () => ['headline', 'title', 'description', 'links'],
  sortable: true,
  stateKey: 'default'
})

const order = useState<string[]>(`hero-list-${props.stateKey}`, () => [...props.sections])

function available(key: string) {
  if (key === 'links') return !!props.links?.length
  return !!(props as Record<string, unknown>)[key]
}

const blocks = computed<string[]>({
  get: () => order.value.filter(available),
  set: (value) => { order.value = value }
})

const el = useTemplateRef<HTMLElement>('el')

useSortable(el, blocks, {
  animation: 150,
  draggable: '[data-section]',
  ghostClass: 'opacity-40',
  forceFallback: true,
  fallbackOnBody: true,
  fallbackTolerance: 5,
  disabled: !props.sortable
})
</script>

<template>
  <UPageHero>
    <template #header>
      <div
        ref="el"
        class="flex flex-col items-center text-center"
      >
        <div
          v-for="key in blocks"
          :key="key"
          :data-section="key"
          class="py-2 select-none"
          :class="sortable && 'cursor-grab'"
        >
          <span
            v-if="key === 'headline'"
            class="text-sm font-semibold text-primary"
          >{{ headline }}</span>
          <h1
            v-else-if="key === 'title'"
            class="text-4xl sm:text-5xl font-bold text-highlighted text-pretty"
          >
            {{ title }}
          </h1>
          <p
            v-else-if="key === 'description'"
            class="text-lg text-muted text-balance"
          >
            {{ description }}
          </p>
          <div
            v-else-if="key === 'links'"
            class="flex flex-wrap justify-center gap-x-4 gap-y-3"
          >
            <UButton
              v-for="(link, i) in links"
              :key="i"
              size="xl"
              v-bind="link"
            />
          </div>
        </div>
      </div>
    </template>
  </UPageHero>
</template>
