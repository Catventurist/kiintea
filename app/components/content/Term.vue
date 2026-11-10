<script setup lang="ts">
const props = withDefaults(defineProps<{
  name?: string
  text?: string
  title?: string
  description?: string
  to?: string
  icon?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}>(), {
  side: 'bottom'
})

const { t } = useI18n()

const { byName } = useGlossary()

const entry = computed(() => (props.name ? byName.value.get(props.name) ?? null : null))

const info = computed(() => ({
  title: props.title ?? entry.value?.title,
  text: props.text ?? entry.value?.text,
  description: props.description ?? entry.value?.description,
  to: props.to ?? entry.value?.to,
  icon: props.icon ?? entry.value?.icon
}))

const rich = computed(() => !!(info.value.description || info.value.to))
const known = computed(() => rich.value || !!info.value.text)

const triggerClass = 'cursor-help rounded-sm underline decoration-dotted decoration-muted underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-primary'
</script>

<template>
  <UPopover
    v-if="rich"
    mode="hover"
    :open-delay="150"
    :close-delay="100"
    enable-touch
    :content="{ side }"
  >
    <span
      tabindex="0"
      :class="triggerClass"
    ><slot mdc-unwrap="p" /></span>

    <template #content>
      <div class="max-w-72 space-y-1.5 p-3">
        <p
          v-if="info.title"
          class="flex items-center gap-1.5 font-medium text-highlighted"
        >
          <UIcon
            v-if="info.icon"
            :name="info.icon"
            class="size-4 text-primary"
          />
          {{ info.title }}
        </p>
        <p
          v-if="info.description"
          class="text-sm text-muted"
        >
          {{ info.description }}
        </p>
        <ULink
          v-if="info.to"
          :to="info.to"
          class="text-sm text-primary"
        >
          {{ t('common.read') }}
        </ULink>
      </div>
    </template>
  </UPopover>

  <UTooltip
    v-else-if="known"
    :text="info.text"
    :content="{ side }"
  >
    <span
      tabindex="0"
      :class="triggerClass"
    ><slot mdc-unwrap="p" /></span>
  </UTooltip>

  <slot
    v-else
    mdc-unwrap="p"
  />
</template>
