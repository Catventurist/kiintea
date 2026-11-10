<script setup lang="ts">
interface GroupItem {
  label: string
  value: number
  color: 'primary' | 'neutral'
}

const FUEL_START = 80
const FUEL_STEP = 5
const GOAL_STEP = 3
const BURN_THRESHOLD = 40
const HANDOVER_THRESHOLD = 50
const SLOP_THRESHOLD = 60
const TWEEN_MS = 350

const flameColors = { burning: 'warning', dying: 'error', cold: 'neutral' } as const
const flameIcons = {
  burning: 'text-warning animate-flicker',
  dying: 'text-error opacity-60 animate-flicker',
  cold: 'text-muted opacity-40'
} as const

const { t } = useI18n()
const toast = useToast()

const fuel = useState('hearth-fuel', () => FUEL_START)
const goalOwnership = useState('hearth-goal', () => 0)
const shownFuel = ref(fuel.value)

const ash = computed(() => 100 - fuel.value)
const shownAsh = computed(() => 100 - shownFuel.value)
const isMaster = computed(() => goalOwnership.value < HANDOVER_THRESHOLD)
const ashDominant = computed(() => ash.value > SLOP_THRESHOLD)

const flameState = computed<keyof typeof flameColors>(() => {
  if (fuel.value === 0) return 'cold'
  return fuel.value > BURN_THRESHOLD ? 'burning' : 'dying'
})

const flickerSpeed = computed(() => `${2.4 - fuel.value / 50}s`)

const groupItems = computed<GroupItem[]>(() => [
  { label: t('hearth.ash.structured'), value: shownFuel.value, color: 'primary' },
  { label: t('hearth.ash.residue'), value: shownAsh.value, color: 'neutral' }
])

const tabs = computed(() => [
  { label: t('hearth.house.cursor.tab'), icon: 'i-lucide-flame', slot: 'cursor' },
  { label: t('hearth.house.codium.tab'), icon: 'i-lucide-shield-check', slot: 'codium' }
])

let frame = 0

function tweenTo(target: number) {
  cancelAnimationFrame(frame)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shownFuel.value = target
    return
  }
  const from = shownFuel.value
  const start = performance.now()
  const step = (now: number) => {
    const progress = Math.min((now - start) / TWEEN_MS, 1)
    shownFuel.value = Math.round(from + (target - from) * progress)
    if (progress < 1) frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
}

function notice() {
  toast.add({
    id: 'draft',
    title: t('hearth.toast.title'),
    description: t('hearth.toast.description'),
    color: 'warning',
    icon: 'i-lucide-wind',
    duration: 4000
  })
}

function feed() {
  fuel.value = Math.max(0, fuel.value - FUEL_STEP)
  goalOwnership.value = Math.min(100, goalOwnership.value + GOAL_STEP)
}

function restart() {
  fuel.value = FUEL_START
  goalOwnership.value = 0
}

watch(fuel, tweenTo)

watch(isMaster, (value, previous) => {
  if (previous && !value) notice()
})

onBeforeUnmount(() => cancelAnimationFrame(frame))

useSeoMeta({
  title: () => t('page.fire.title'),
  description: () => t('page.fire.description'),
  ogTitle: () => t('page.fire.title'),
  ogDescription: () => t('page.fire.description')
})
</script>

<template>
  <div class="p-6 space-y-8">
    <UCard
      class="animate-rise stagger motion-reduce:animate-none"
      style="--i: 0"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 font-medium">
            <UIcon
              name="i-lucide-flame"
              class="size-5 origin-[50%_90%] transition-colors motion-reduce:animate-none"
              :class="flameIcons[flameState]"
              :style="{ '--flicker': flickerSpeed }"
            />
            {{ t('hearth.flame.title') }}
          </span>
          <UBadge
            :color="flameColors[flameState]"
            :label="t(`hearth.flame.${flameState}`)"
            variant="subtle"
            size="sm"
            aria-live="polite"
          />
        </div>
      </template>

      <UProgress
        :model-value="shownFuel"
        :max="100"
        :color="flameColors[flameState]"
        :aria-label="t('hearth.a11y.fuel')"
        size="xl"
        status
      />

      <p class="mt-3 text-sm text-muted">
        {{ t('hearth.flame.description') }}
      </p>

      <div class="mt-3 flex gap-2">
        <UButton
          :label="t('hearth.flame.feed')"
          variant="outline"
          color="warning"
          size="sm"
          :disabled="fuel === 0"
          class="transition-transform active:scale-95"
          @click="feed"
        />
        <UButton
          :label="t('hearth.flame.restart')"
          variant="ghost"
          color="neutral"
          size="sm"
          class="transition-transform active:scale-95"
          @click="restart"
        />
      </div>
    </UCard>

    <UCard
      class="animate-rise stagger motion-reduce:animate-none"
      style="--i: 1"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <span class="font-medium">{{ t('hearth.ash.title') }}</span>
          <UBadge
            :color="ashDominant ? 'error' : 'neutral'"
            :label="ashDominant ? t('hearth.ash.slop') : t('hearth.ash.manageable')"
            variant="subtle"
            size="sm"
            aria-live="polite"
          />
        </div>
      </template>

      <UProgressGroup
        :items="groupItems"
        size="lg"
        status
      />

      <p class="mt-3 text-sm text-muted">
        {{ t('hearth.ash.description') }}
      </p>
    </UCard>

    <UAlert
      class="animate-rise stagger motion-reduce:animate-none"
      style="--i: 2"
      :title="t('hearth.invitation.title')"
      :description="t('hearth.invitation.description')"
      color="warning"
      variant="subtle"
      icon="i-lucide-flame"
    />

    <UCard
      class="animate-rise stagger transition-shadow duration-500 motion-reduce:animate-none motion-reduce:transition-none"
      :class="{ 'ring-error shadow-lg shadow-error/30': !isMaster }"
      style="--i: 3"
    >
      <template #header>
        <span class="font-medium">{{ t('hearth.handover.title') }}</span>
      </template>

      <USlider
        v-model="goalOwnership"
        :min="0"
        :max="100"
        :color="isMaster ? 'success' : 'error'"
        :aria-label="t('hearth.a11y.goal')"
      />
      <div
        class="mt-2 flex justify-between text-xs text-muted select-none"
        aria-hidden="true"
      >
        <span>{{ t('hearth.handover.you') }}</span>
        <span>{{ t('hearth.handover.handover') }}</span>
        <span>{{ t('hearth.handover.model') }}</span>
      </div>

      <div class="mt-4">
        <UBadge
          :color="isMaster ? 'success' : 'error'"
          :label="isMaster ? t('hearth.handover.master') : t('hearth.handover.servant')"
          :variant="isMaster ? 'solid' : 'outline'"
          size="md"
          aria-live="polite"
        />
      </div>

      <Transition
        enter-active-class="transition duration-300 motion-reduce:transition-none"
        leave-active-class="transition duration-300 motion-reduce:transition-none"
        enter-from-class="opacity-0 -translate-y-1.5"
        leave-to-class="opacity-0 -translate-y-1.5"
      >
        <p
          v-if="!isMaster"
          class="mt-3 text-sm text-error"
        >
          {{ t('hearth.handover.warning') }}
        </p>
      </Transition>
    </UCard>

    <UCard
      class="animate-rise stagger motion-reduce:animate-none"
      style="--i: 4"
    >
      <template #header>
        <span class="font-medium">{{ t('hearth.house.title') }}</span>
      </template>

      <UTabs :items="tabs">
        <template #cursor>
          <div class="space-y-3">
            <UAlert
              :title="t('hearth.house.cursor.title')"
              :description="t('hearth.house.cursor.description')"
              color="error"
              variant="soft"
              icon="i-lucide-flame"
            />
            <UBadge
              :label="t('hearth.house.cursor.update')"
              color="error"
              variant="subtle"
            />
          </div>
        </template>

        <template #codium>
          <div class="space-y-3">
            <UAlert
              :title="t('hearth.house.codium.title')"
              :description="t('hearth.house.codium.description')"
              color="success"
              variant="subtle"
              icon="i-lucide-shield-check"
            />
            <div class="flex gap-2">
              <UBadge
                :label="t('hearth.house.codium.update')"
                color="success"
                variant="subtle"
              />
              <UBadge
                :label="t('hearth.house.codium.agent')"
                color="neutral"
                variant="subtle"
              />
            </div>
          </div>
        </template>
      </UTabs>
    </UCard>

    <UCard
      class="animate-rise stagger motion-reduce:animate-none"
      style="--i: 5"
    >
      <template #header>
        <span class="font-medium">{{ t('hearth.lol.title') }}</span>
      </template>

      <p class="text-sm text-muted">
        {{ t('hearth.lol.description') }}
      </p>

      <UButton
        :label="t('hearth.lol.notice')"
        variant="ghost"
        size="sm"
        class="mt-3 transition-transform active:scale-95"
        @click="notice"
      />
    </UCard>
  </div>
</template>
