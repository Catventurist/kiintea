<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

interface Resource {
  title: string
  to: string
  type?: string
  target?: '_blank' | '_self'
  contributors?: string[]
}

const props = withDefaults(defineProps<{
  items: Resource[]
  avatar?: string
  avatarDark?: string
  handle?: boolean
}>(), {
  handle: true,
  avatar: '/catlight.webp',
  avatarDark: '/catdark.webp'
})

const colorMode = useColorMode()

const avatarSrc = computed(() =>
  colorMode.value === 'dark' && props.avatarDark ? props.avatarDark : props.avatar
)

const list = ref([...props.items])
const el = useTemplateRef<HTMLElement>('el')

function targetFor(item: Resource) {
  if (item.target) return item.target
  return /^https?:\/\//.test(item.to) ? '_blank' : undefined
}

useSortable(el, list, {
  animation: 150,
  handle: props.handle ? '[data-drag-handle]' : undefined
})
</script>

<template>
  <ul
    ref="el"
    class="divide-y divide-default my-6 animate-rise"
  >
    <li
      v-for="item in list"
      :key="item.to"
      class="flex items-center gap-3 py-3"
    >
      <UIcon
        v-if="handle"
        data-drag-handle
        name="i-lucide-grip-vertical"
        class="cursor-grab text-muted"
      />

      <ULink
        :to="item.to"
        :target="targetFor(item)"
        class="font-medium"
      >
        {{ item.title }}
      </ULink>
      <UBadge
        v-if="item.type"
        :label="item.type"
        variant="subtle"
        size="md"
      />

      <div class="ml-auto flex gap-2">
        <UUser
          v-for="name in item.contributors"
          :key="name"
          :name="name"
          :avatar="{ src: avatarSrc, alt: name }"
          size="xs"
        />
      </div>
    </li>
  </ul>
</template>
