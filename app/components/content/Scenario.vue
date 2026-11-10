<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

interface Step {
  title: string
  description?: string
  entity?: string
  icon?: string
}

const props = defineProps<{ title?: string, steps: Step[] }>()

const { t } = useI18n()
const active = ref(0)
const direction = ref<'forward' | 'back'>('forward')

watch(active, (next, prev) => {
  direction.value = next >= prev ? 'forward' : 'back'
})

const items = computed<StepperItem[]>(() =>
  props.steps.map((step, i) => ({ value: i, title: step.title, icon: step.icon }))
)

const current = computed(() => props.steps[active.value])
</script>

<template>
  <div class="my-6 rounded-lg border border-default p-4">
    <p
      v-if="title"
      class="mb-4 font-semibold"
    >
      {{ title }}
    </p>

    <UStepper
      v-model="active"
      :items="items"
      :linear="false"
      size="sm"
    />

    <div class="relative min-h-24 overflow-hidden py-4">
      <Transition
        :name="`scenario-${direction}`"
        mode="out-in"
      >
        <div :key="active">
          <MDC
            v-if="current?.description"
            :value="current.description"
            unwrap="p"
          />

          <ULink
            v-if="current?.entity"
            :to="`/flow/${current.entity}`"
            icon="i-lucide-arrow-up-right"
            class="mt-3 flex"
          >
            {{ t(`flow.entities.${current.entity}`) }}
          </ULink>
        </div>
      </Transition>
    </div>

    <div class="flex justify-between">
      <UButton
        :label="t('common.prev')"
        icon="i-lucide-arrow-left"
        variant="ghost"
        color="neutral"
        :disabled="active === 0"
        @click="active--"
      />
      <UButton
        :label="t('common.next')"
        trailing-icon="i-lucide-arrow-right"
        :disabled="active === steps.length - 1"
        @click="active++"
      />
    </div>
  </div>
</template>

<style scoped>
.scenario-forward-enter-active,
.scenario-forward-leave-active,
.scenario-back-enter-active,
.scenario-back-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.scenario-forward-enter-from { opacity: 0; transform: translateX(16px); }
.scenario-forward-leave-to   { opacity: 0; transform: translateX(-16px); }
.scenario-back-enter-from    { opacity: 0; transform: translateX(-16px); }
.scenario-back-leave-to      { opacity: 0; transform: translateX(16px); }

@media (prefers-reduced-motion: reduce) {
  .scenario-forward-enter-active,
  .scenario-forward-leave-active,
  .scenario-back-enter-active,
  .scenario-back-leave-active {
    transition: none;
  }
}
</style>
