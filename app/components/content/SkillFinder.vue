<script setup lang="ts">
const props = withDefaults(defineProps<{
  members: FinderMember[]
  sortable?: boolean
  minLevel?: number
  avatar?: string
  avatarDark?: string
}>(), {
  sortable: false,
  minLevel: 3,
  avatar: '/catlight.webp',
  avatarDark: '/catdark.webp'
})

const colorMode = useColorMode()
const avatarSrc = computed(() =>
  colorMode.value === 'dark' ? props.avatarDark : props.avatar
)

const { t } = useI18n()

const skillItems = computed(() => [
  { label: t('skills.all'), value: 'All' },
  ...allSkills.value.filter(n => n !== 'All').map(n => ({ label: n, value: n }))
])

const allSkills = computed(() => {
  const names = new Set<string>()
  props.members.forEach((m) => {
    m.skills.forEach(s => names.add(s.name))
    m.learning?.forEach(l => names.add(l.name))
  })
  return ['All', ...[...names].sort()]
})

const selected = ref('All')
const onlyHelpers = ref(false)

function levelOf(m: FinderMember, skill: string) {
  return m.skills.find(s => s.name === skill)?.level ?? 0
}

const visible = computed(() => {
  const skill = selected.value
  return props.members
    .filter(m => !onlyHelpers.value || m.openToHelp)
    .filter(m => skill === 'All'
      || levelOf(m, skill) > 0
      || m.learning?.some(l => l.name === skill))
    .sort((a, b) => skill === 'All'
      ? a.name.localeCompare(b.name)
      : levelOf(b, skill) - levelOf(a, skill))
})

function helpersFor(skill: string, self: string) {
  return props.members.filter(m =>
    m.name !== self && m.openToHelp && levelOf(m, skill) >= props.minLevel
  ).length
}

const settled = ref(false)
onMounted(() => setTimeout(() => {
  settled.value = true
}, 600))
</script>

<template>
  <div class="my-6 flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-3">
      <USelect
        v-model="selected"
        :items="skillItems"
        class="w-44"
      />
      <USwitch
        v-model="onlyHelpers"
        :label="t('skills.openToHelp')"
      />
      <span class="text-sm text-muted">
        {{ t('skills.members', visible.length) }}
      </span>
    </div>

    <SkillFinderCard
      v-for="(m, i) in visible"
      :key="m.name"
      :member="m"
      :selected="selected"
      :avatar="avatarSrc"
      :sortable="sortable"
      :helpers="(skill: string) => helpersFor(skill, m.name)"
      :class="settled ? '' : 'animate-emerge'"
      :style="settled ? undefined : { '--rv-delay': Math.min(i, 5) * 30 + 'ms' }"
    />

    <p
      v-if="!visible.length"
      class="text-sm text-muted"
    >
      {{ t('skills.empty') }}
    </p>
  </div>
</template>
