<script setup lang="ts">
interface ChecklistItem {
  label: string
  description?: string
  checked?: boolean
}

const props = withDefaults(defineProps<{
  items: (string | ChecklistItem)[]
  id?: string
  title?: string
  resetLabel?: string
}>(), {
  resetLabel: 'Reset'
})

const route = useRoute()
const { t } = useI18n()

const entries = computed(() => props.items.map(item =>
  typeof item === 'string' ? { label: item } as ChecklistItem : item
))

const checkboxItems = computed(() => entries.value.map(item => ({
  label: item.label,
  value: item.label,
  description: item.description
})))

const checked = useState<string[]>(
  `checklist:${props.id ?? route.path}`,
  () => entries.value.filter(i => i.checked).map(i => i.label)
)

const total = computed(() => entries.value.length)
const done = computed(() => checked.value.length)
const complete = computed(() => total.value > 0 && done.value === total.value)

function reset() {
  checked.value = []
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between gap-2">
      <p
        v-if="title"
        class="text-sm font-semibold"
      >
        {{ title }}
      </p>
      <span class="ms-auto text-sm text-muted">{{ done }} / {{ total }}</span>
    </div>

    <UProgress
      :model-value="done"
      :max="total"
      :color="complete ? 'success' : 'primary'"
      size="sm"
    />

    <UCheckboxGroup
      v-model="checked"
      :items="checkboxItems"
    />

    <UButton
      :label="t('common.reset')"
      icon="i-lucide-rotate-ccw"
      color="neutral"
      variant="link"
      size="xs"
      :disabled="done === 0"
      @click="reset"
    />
  </div>
</template>
