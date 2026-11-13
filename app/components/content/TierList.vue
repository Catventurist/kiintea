<script setup lang="ts">
interface Tier {
  label: string
  color?: string
}

interface Item {
  label: string
  icon?: string
}

const props = withDefaults(defineProps<{
  tiers: Tier[]
  items: (string | Item)[]
  stateKey?: string
  sortable?: boolean
}>(), {
  stateKey: 'default',
  sortable: true
})

const normalized = computed<Item[]>(() =>
  props.items.map(i => typeof i === 'string' ? { label: i } : i)
)

const icons = computed(() =>
  Object.fromEntries(normalized.value.map(i => [i.label, i.icon]))
)

const rows = useState<Record<string, string[]>>(`tier-list-${props.stateKey}`, () => ({
  ...Object.fromEntries(props.tiers.map(t => [t.label, []])),
  pool: normalized.value.map(i => i.label)
}))

const { t } = useI18n()

const rowList = computed(() => [
  ...props.tiers.map(tier => ({ key: tier.label, label: tier.label, color: tier.color })),
  { key: 'pool', label: t('common.unranked'), color: undefined }
])

function move(from: string, to: string, oldIndex: number, newIndex: number) {
  const [item] = rows.value[from]!.splice(oldIndex, 1)
  rows.value[to]!.splice(newIndex, 0, item!)
}
</script>

<template>
  <div class="my-6 flex flex-col gap-2">
    <TierRow
      v-for="row in rowList"
      :key="row.key"
      v-model="rows[row.key]!"
      :row-key="row.key"
      :label="row.label"
      :color="row.color"
      :icons="icons"
      :group="`tier-${stateKey}`"
      :sortable="sortable"
      @move="move"
    />
  </div>
</template>
