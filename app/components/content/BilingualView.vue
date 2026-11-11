<script setup lang="ts">
const props = withDefaults(defineProps<{
  path: string
  height?: number
  linked?: boolean
}>(), {
  height: 70,
  linked: true
})

const { t } = useI18n()

const nested = inject<boolean>('bilingual-view', false)
provide('bilingual-view', true)

const fields = ['title', 'path', 'body'] as const

const { data: pages, status } = useLazyAsyncData(
  'bilingual-' + props.path,
  async () => {
    const [en, fi] = await Promise.all([
      queryCollection('content_en').path('/en' + props.path).select(...fields).first(),
      queryCollection('content_fi').path('/fi' + props.path).select(...fields).first()
    ])
    return { en, fi }
  },
  { server: false, immediate: !nested }
)

const loading = computed(() => status.value === 'idle' || status.value === 'pending')

const sync = ref(props.linked)
const left = useTemplateRef<HTMLElement>('left')
const right = useTemplateRef<HTMLElement>('right')
let busy = false

function blocks(el: HTMLElement | null) {
  return Array.from(el?.firstElementChild?.children ?? []) as HTMLElement[]
}

function follow(from: HTMLElement | null, to: HTMLElement | null) {
  if (!sync.value || busy || !from || !to) return

  const source = blocks(from)
  const target = blocks(to)
  let top: number

  if (source.length && source.length === target.length) {
    let index = source.findIndex(block => block.offsetTop + block.offsetHeight > from.scrollTop)
    if (index === -1) index = source.length - 1
    const block = source[index]!
    const match = target[index]!
    const ratio = (from.scrollTop - block.offsetTop) / Math.max(block.offsetHeight, 1)
    top = match.offsetTop + ratio * match.offsetHeight
  } else {
    const ratio = from.scrollTop / Math.max(from.scrollHeight - from.clientHeight, 1)
    top = ratio * (to.scrollHeight - to.clientHeight)
  }

  busy = true
  to.scrollTop = top
  requestAnimationFrame(() => {
    busy = false
  })
}
</script>

<template>
  <UAlert
    v-if="nested"
    color="warning"
    variant="subtle"
    :title="t('bilingual.nested')"
  />

  <div
    v-else
    class="my-6 space-y-3"
  >
    <div class="flex items-center justify-between">
      <p class="font-mono text-sm text-muted">
        {{ path }}
      </p>
      <USwitch
        v-model="sync"
        :label="t('bilingual.sync')"
      />
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="min-w-0 space-y-2">
        <UBadge
          label="EN"
          color="info"
          variant="subtle"
        />
        <div
          ref="left"
          class="relative overflow-y-auto rounded-lg p-4 ring ring-default"
          :style="{ height: height + 'vh' }"
          @scroll="follow(left, right)"
        >
          <USkeleton
            v-if="loading"
            class="h-full w-full"
          />
          <ContentRenderer
            v-else-if="pages?.en"
            :value="pages.en"
          />
          <UAlert
            v-else
            color="neutral"
            variant="subtle"
            :title="t('bilingual.missing')"
          />
        </div>
      </div>

      <div class="min-w-0 space-y-2">
        <UBadge
          label="FI"
          color="success"
          variant="subtle"
        />
        <div
          ref="right"
          class="relative overflow-y-auto rounded-lg p-4 ring ring-default"
          :style="{ height: height + 'vh' }"
          @scroll="follow(right, left)"
        >
          <USkeleton
            v-if="loading"
            class="h-full w-full"
          />
          <ContentRenderer
            v-else-if="pages?.fi"
            :value="pages.fi"
          />
          <UAlert
            v-else
            color="neutral"
            variant="subtle"
            :title="t('bilingual.missing')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
