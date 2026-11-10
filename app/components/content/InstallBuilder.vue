<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

interface InstallOption {
  label: string
  package: string
  description?: string
  checked?: boolean
}

type Manager = 'bun' | 'npm' | 'pnpm' | 'yarn'

const props = withDefaults(defineProps<{
  packages?: string[]
  options?: InstallOption[]
  dev?: boolean
  manager?: Manager
}>(), {
  packages: () => [],
  options: () => [],
  dev: false,
  manager: 'bun'
})

const commands: Record<Manager, { add: string, dev: string }> = {
  bun: { add: 'bun add', dev: 'bun add -d' },
  npm: { add: 'npm install', dev: 'npm install -D' },
  pnpm: { add: 'pnpm add', dev: 'pnpm add -D' },
  yarn: { add: 'yarn add', dev: 'yarn add -D' }
}

const { t } = useI18n()

const managers = (Object.keys(commands) as Manager[]).map(value => ({ label: value, value }))

const stored = useState<string>('install-pm', () => props.manager)

const manager = computed<Manager>({
  get: () => (stored.value in commands ? stored.value : props.manager) as Manager,
  set: (value) => {
    stored.value = value
  }
})

const selected = ref<string[]>(props.options.filter(o => o.checked).map(o => o.package))

const items = computed(() => props.options.map(o => ({
  label: o.label,
  value: o.package,
  description: o.description
})))

const command = computed(() => {
  const extra = props.options.map(o => o.package).filter(p => selected.value.includes(p))
  const base = commands[manager.value][props.dev ? 'dev' : 'add']
  return [base, ...props.packages, ...extra].join(' ')
})

const { copy, copied } = useClipboard({ copiedDuring: 1500 })
</script>

<template>
  <div class="space-y-4">
    <UTabs
      v-model="manager"
      :items="managers"
      :content="false"
      variant="link"
      size="md"
    />

    <UCheckboxGroup
      v-if="options.length"
      v-model="selected"
      :items="items"
    />

    <div class="flex items-center justify-between gap-2 rounded-lg bg-elevated px-4 py-3">
      <code class="overflow-x-auto whitespace-nowrap text-sm">
        <span class="select-none text-muted">$ </span>{{ command }}
      </code>
      <UButton
        :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
        color="neutral"
        variant="ghost"
        size="sm"
        :aria-label="t('common.copy.command')"
        @click="copy(command)"
      />
    </div>
  </div>
</template>
