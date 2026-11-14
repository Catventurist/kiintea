<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

const props = defineProps<{
  member: FinderMember
  selected: string
  avatar: string
  sortable?: boolean
  helpers: (skill: string) => number
}>()

const { t } = useI18n()

const levelLabels = computed(() => [
  '',
  t('skills.level1'),
  t('skills.level2'),
  t('skills.level3'),
  t('skills.level4')
])
const year = new Date().getFullYear()

const skills = ref([...props.member.skills])
const learning = ref([...(props.member.learning ?? [])])

const selectedLevel = computed(() =>
  props.member.skills.find(s => s.name === props.selected)?.level ?? 0
)

const description = computed(() =>
  [
    props.member.role,
    props.member.since ? t('skills.years', year - props.member.since) : ''
  ].filter(Boolean).join(' · ')
)

const skillsEl = useTemplateRef<HTMLElement>('skillsEl')
const learningEl = useTemplateRef<HTMLElement>('learningEl')

const popped = ref<string | null>(null)

function options() {
  return {
    animation: 150,
    handle: '[data-drag-handle]',
    disabled: !props.sortable,
    onEnd: (evt: { item: HTMLElement }) => {
      const key = evt.item.dataset.name ?? null
      nextTick(() => {
        popped.value = key
      })
    }
  }
}

useSortable(skillsEl, skills, options())
useSortable(learningEl, learning, options())
</script>

<template>
  <UCollapsible
    :unmount-on-hide="false"
    class="rounded-md border border-default"
  >
    <UButton
      variant="ghost"
      color="neutral"
      block
      trailing-icon="i-lucide-chevron-down"
      class="justify-between p-3"
    >
      <UUser
        :name="member.name"
        :description="description"
        :avatar="{ src: avatar, alt: member.name }"
        size="sm"
      />
      <span class="ml-auto flex gap-1">
        <UBadge
          v-if="selected !== 'All' && selectedLevel"
          :label="levelLabels[selectedLevel]"
          variant="subtle"
        />
        <UBadge
          v-if="member.openToHelp"
          :label="t('skills.openToHelp')"
          color="success"
          variant="subtle"
          class="animate-flicker"
        />
      </span>
    </UButton>

    <template #content>
      <div class="flex flex-col gap-4 border-t border-default p-4 text-sm">
        <div class="flex flex-wrap items-center gap-3 text-muted">
          <span v-if="member.availability">
            {{ t('skills.available', { value: member.availability }) }}
          </span>
          <ULink
            v-if="member.to"
            :to="member.to"
            class="text-primary"
          >
            {{ t('skills.profile') }}
          </ULink>
        </div>

        <div>
          <p class="mb-2 font-medium">
            {{ t('skills.title') }}
          </p>
          <ul
            ref="skillsEl"
            class="flex flex-col gap-1.5"
          >
            <li
              v-for="s in skills"
              :key="s.name"
              :data-name="'s:' + s.name"
              :class="popped === 's:' + s.name ? 'animate-quiz-pop' : ''"
              class="flex flex-wrap items-center gap-2"
              @animationend.self="popped = null"
            >
              <UIcon
                v-if="sortable"
                data-drag-handle
                name="i-lucide-grip-vertical"
                class="cursor-grab text-muted"
              />
              <UBadge
                :label="s.name"
                variant="outline"
                color="neutral"
              />
              <UProgress
                :model-value="s.level"
                :max="4"
                size="xs"
                class="w-24"
              />
              <span class="text-muted">
                {{ levelLabels[s.level] }}
                <template v-if="s.years"> · {{ t('skills.yrs', s.years) }}</template>
                <template v-if="s.note"> · {{ s.note }}</template>
              </span>
            </li>
          </ul>
        </div>

        <div v-if="learning.length">
          <p class="mb-2 font-medium">
            {{ t('skills.learning') }}
          </p>
          <ul
            ref="learningEl"
            class="flex flex-col gap-2"
          >
            <li
              v-for="l in learning"
              :key="l.name"
              :data-name="'l:' + l.name"
              :class="popped === 'l:' + l.name ? 'animate-quiz-pop' : ''"
              @animationend.self="popped = null"
            >
              <div class="flex flex-wrap items-center gap-2">
                <UIcon
                  v-if="sortable"
                  data-drag-handle
                  name="i-lucide-grip-vertical"
                  class="cursor-grab text-muted"
                />
                <UBadge
                  :label="l.name"
                  color="info"
                  variant="subtle"
                />
                <UProgress
                  v-if="l.progress !== undefined"
                  :model-value="l.progress"
                  size="xs"
                  class="w-24"
                />
                <span
                  v-if="l.goal"
                  class="text-muted"
                >{{ l.goal }}</span>
              </div>
              <p class="mt-1 text-sm text-muted">
                {{ t('skills.canHelp', { count: helpers(l.name), skill: l.name }, helpers(l.name)) }}
              </p>
            </li>
          </ul>
        </div>

        <div v-if="member.projects?.length">
          <p class="mb-2 font-medium">
            {{ t('skills.projects') }}
          </p>
          <div class="flex flex-wrap gap-3">
            <ULink
              v-for="p in member.projects"
              :key="p.to"
              :to="p.to"
              :target="p.to.startsWith('http') ? '_blank' : undefined"
              class="text-primary"
            >
              {{ p.title }}
            </ULink>
          </div>
        </div>
      </div>
    </template>
  </UCollapsible>
</template>
