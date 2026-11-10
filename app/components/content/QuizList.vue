<script setup lang="ts">
const props = defineProps<{
  title: string
  items: string[]
  success: string
  fail: string
  hint?: string
}>()

const { t } = useI18n()
const el = useTemplateRef<HTMLElement>('el')
const { list, result, animate, touched, attempts, reset, move, check } = useSortQuiz(el, () => props.items)
</script>

<template>
  <div class="my-6">
    <p class="font-semibold">
      {{ title }}
    </p>

    <ul
      ref="el"
      class="m-4 space-y-2 list-none"
      :class="animate === 'shake' && 'animate-quiz-shake'"
      @animationend.self="animate = null"
    >
      <li
        v-for="(item, i) in list"
        :key="item.id"
        class="flex items-center gap-2 rounded-md border p-2 transition-colors motion-reduce:animate-none"
        :class="[
          result === null ? 'border-default' : item.id === i ? 'border-success bg-success/10' : 'border-error bg-error/10',
          animate === 'pop' && 'animate-quiz-pop'
        ]"
        :style="{ animationDelay: `${i * 80}ms` }"
      >
        <UIcon
          name="i-lucide-grip-vertical"
          data-handle
          class="cursor-grab shrink-0 text-muted"
          aria-hidden="true"
        />
        <span class="grow"><MDC
          :value="item.label"
          unwrap="p"
        /></span>

        <UButton
          data-move
          size="xs"
          variant="ghost"
          color="neutral"
          icon="i-lucide-chevron-up"
          :disabled="i === 0"
          :aria-label="t('quiz.moveUp', { item: item.label })"
          @click="move(i, -1)"
        />
        <UButton
          data-move
          size="xs"
          variant="ghost"
          color="neutral"
          icon="i-lucide-chevron-down"
          :disabled="i === list.length - 1"
          :aria-label="t('quiz.moveDown', { item: item.label })"
          @click="move(i, 1)"
        />
      </li>
    </ul>

    <div class="flex gap-2">
      <UButton
        :label="t('quiz.check')"
        :disabled="!touched"
        @click="check"
      />
      <UButton
        v-if="result === false"
        variant="ghost"
        color="neutral"
        :label="t('quiz.reset')"
        @click="reset"
      />
    </div>

    <div aria-live="polite">
      <UAlert
        v-if="result !== null"
        class="mt-3"
        variant="subtle"
        :color="result ? 'success' : 'error'"
        :title="result ? success : fail"
      />
      <UAlert
        v-if="result === false && hint && attempts >= 2"
        class="mt-3"
        variant="subtle"
        color="info"
        icon="i-lucide-lightbulb"
        :title="hint"
      />
    </div>
  </div>
</template>
