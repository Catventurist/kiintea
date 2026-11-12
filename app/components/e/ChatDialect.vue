<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import { onKeyStroke } from '@vueuse/core'
import { shallowRef, computed, watch, nextTick, useTemplateRef } from 'vue'
import { useRoute, navigateTo, useState } from '#imports'
import type { Color } from '#imports'

type DialecticRole = 'thesis' | 'antithesis' | 'synthesis'

interface Msg {
  id: string
  role: 'user' | 'assistant'
  parts: { type: string, text: string }[]
  createdAt: string
  dialectic?: DialecticRole
  linksTo?: DialecticRole
}

const { t } = useI18n()
const route = useRoute()
const validStages: readonly DialecticRole[] = ['thesis', 'antithesis', 'synthesis']
const stage = route.query.stage as string
const activeId = useState<DialecticRole>('dialect-stage', () =>
  (validStages as readonly string[]).includes(stage) ? stage as DialecticRole : 'thesis'
)
watch(activeId, id => navigateTo({ query: { ...route.query, stage: id } }, { replace: true }))

const conversations = shallowRef([
  { id: 'thesis' as DialecticRole, dialectic: 'thesis' as const },
  { id: 'antithesis' as DialecticRole, dialectic: 'antithesis' as const },
  { id: 'synthesis' as DialecticRole, dialectic: 'synthesis' as const }
])

const unreadIds = useState<Set<string>>('dialect-unread', () => new Set(['antithesis']))
watch(activeId, id => unreadIds.value.delete(id))

const allMessages: Record<string, Msg[]> = {
  thesis: [
    { id: '1', role: 'user', parts: [{ type: 'text', text: 'e2ee:v1:a3f9…' }], createdAt: '2026-11-12T14:02:00' },
    { id: '2', role: 'assistant', parts: [{ type: 'text', text: 'e2ee:v1:b7c2…' }], createdAt: '2026-11-12T14:03:00', dialectic: 'thesis', linksTo: 'antithesis' }
  ],
  antithesis: [
    { id: '3', role: 'user', parts: [{ type: 'text', text: 'e2ee:v1:d1e4…' }], createdAt: '2026-11-12T10:15:00' },
    { id: '4', role: 'assistant', parts: [{ type: 'text', text: 'e2ee:v1:f5a0…' }], createdAt: '2026-11-12T10:16:00', dialectic: 'antithesis', linksTo: 'synthesis' }
  ],
  synthesis: [
    { id: '5', role: 'user', parts: [{ type: 'text', text: 'e2ee:v1:c4d8…' }], createdAt: '2026-11-12T09:00:00' },
    { id: '6', role: 'assistant', parts: [{ type: 'text', text: 'e2ee:v1:e9b1…' }], createdAt: '2026-11-12T09:01:00', dialectic: 'synthesis', linksTo: 'thesis' }
  ]
}

const messages = computed(() => allMessages[activeId.value] ?? [])

const grouped = computed(() => {
  const groups: { day: string, msgs: Msg[] }[] = []
  for (const m of messages.value) {
    const day = new Date(m.createdAt).toLocaleDateString('es-ES', {
      weekday: 'short', day: 'numeric', month: 'short'
    })
    const last = groups[groups.length - 1]
    if (last?.day === day) last.msgs.push(m)
    else groups.push({ day, msgs: [m] })
  }
  return groups
})

const showPlaintext = useState<boolean>('dialect-show-plaintext', () => false)
const input = ref('')
const userMessages = useState<Record<string, string>>('dialect-user-msgs', () => ({}))

const listEl = useTemplateRef<HTMLDivElement>('list')
useSortable(listEl, conversations, { animation: 150 })

const chatWrapper = useTemplateRef<HTMLDivElement>('chat-wrapper')
watch(activeId, () => {
  nextTick(() => {
    const el = chatWrapper.value
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  })
})

onKeyStroke(['ArrowDown', 'ArrowUp'], (e) => {
  const idx = conversations.value.findIndex(c => c.id === activeId.value)
  const next = e.key === 'ArrowDown' ? idx + 1 : idx - 1
  if (conversations.value[next]) activeId.value = conversations.value[next].id
})

const nextInChain: Record<DialecticRole, DialecticRole> = {
  thesis: 'antithesis',
  antithesis: 'synthesis',
  synthesis: 'thesis'
}

function send() {
  const text = input.value.trim()
  if (!text) return

  const id = `msg-${Date.now()}`
  const msg: Msg = {
    id,
    role: 'user',
    parts: [{ type: 'text', text: `e2ee:v1:${id.slice(-6)}…` }],
    createdAt: new Date().toISOString()
  }

  if (!allMessages[activeId.value]) allMessages[activeId.value] = []
  allMessages[activeId.value]!.push(msg)
  userMessages.value[id] = text

  const next = nextInChain[activeId.value]
  if (next) activeId.value = next

  input.value = ''
}

function dialecticColor(role: DialecticRole): Color {
  const map: Record<DialecticRole, Color> = { thesis: 'primary', antithesis: 'error', synthesis: 'success' }
  return map[role]
}

function followChain(msg: Msg) {
  if (msg.linksTo) activeId.value = msg.linksTo
}
</script>

<template>
  <div class="flex size-full">
    <aside class="w-16 md:w-60 border-r border-muted flex flex-col">
      <div class="px-3 py-2 min-h-10 border-b border-muted flex items-center gap-2">
        <UInput
          id="search-nothing"
          :placeholder="t('conversations.search')"
          icon="i-lucide-search"
          size="xs"
          color="primary"
          class="flex-1 hidden md:block"
        />
        <UButton
          icon="i-lucide-search"
          class="ms-1.5 md:hidden"
          variant="outline"
          size="xs"
        />
      </div>
      <div
        ref="list"
        class="flex-1 overflow-y-auto p-2 space-y-1"
      >
        <div
          v-for="c in conversations"
          :key="c.id"
          class="relative"
        >
          <UUser
            :name="t(`conversations.${c.dialectic}.name`)"
            :description="t(`conversations.${c.dialectic}.description`)"
            :avatar="{ text: t(`conversations.${c.dialectic}.name`)[0], color: dialecticColor(c.dialectic) }"
            size="sm"
            :ui="{ wrapper: 'hidden md:block' }"
            :class="{ 'bg-elevated': c.id === activeId }"
            class="w-full cursor-pointer rounded-md p-2"
            @click="activeId = c.id"
          />
          <span
            v-if="unreadIds.has(c.id)"
            class="absolute top-1 right-1 size-2 rounded-full bg-primary"
          />
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col min-h-0">
      <header class="px-3 py-2 border-b border-muted flex items-center justify-between">
        <h2 class="text-sm font-semibold truncate">
          {{ t(`conversations.${conversations.find(c => c.id === activeId)?.dialectic ?? 'thesis'}.name`) }}
        </h2>
        <UButton
          :icon="showPlaintext ? 'i-lucide-lock-open' : 'i-lucide-lock'"
          variant="ghost"
          size="xs"
          color="neutral"
          @click="showPlaintext = !showPlaintext"
        />
      </header>

      <div
        ref="chat-wrapper"
        class="flex-1 overflow-y-auto min-h-0"
      >
        <UChatMessages>
          <template #default="{ registerMessageRef }">
            <template
              v-for="(group, gi) in grouped"
              :key="group.day"
            >
              <USeparator
                v-if="gi > 0"
                :label="group.day"
                class="my-3"
              />
              <UChatMessage
                v-for="msg in group.msgs"
                :key="msg.id"
                v-bind="msg"
                :ref="(el: any) => registerMessageRef(msg.id, el)"
                :side="msg.role === 'user' ? 'right' : 'left'"
                :variant="msg.role === 'user' ? 'soft' : 'naked'"
                :avatar="msg.role === 'assistant' ? { text: 'A' } : undefined"
              >
                <template #content>
                  <div class="flex flex-col gap-1 animate-rise">
                    <UBadge
                      v-if="msg.dialectic"
                      :color="dialecticColor(msg.dialectic)"
                      variant="subtle"
                      size="md"
                      as="button"
                      class="w-full h-5 py-0 justify-between"
                      :class="{ 'cursor-pointer': msg.dialectic === 'synthesis' && msg.linksTo }"
                      @click="msg.dialectic === 'synthesis' && msg.linksTo && followChain(msg)"
                    >
                      {{ t(`conversations.badges.${msg.dialectic}`) }}
                      <UIcon
                        v-if="msg.dialectic === 'synthesis' && msg.linksTo"
                        name="i-lucide-arrow-right"
                        class="size-3"
                      />
                    </UBadge>
                    <UTooltip
                      :text="showPlaintext ? msg.parts[0]?.text : (userMessages[msg.id] ?? t(`conversations.messages.${msg.id}`))"
                      :content="{ side: 'top', sideOffset: 8 }"
                    >
                      <span class="cursor-default">
                        {{ showPlaintext ? (userMessages[msg.id] ?? t(`conversations.messages.${msg.id}`)) : (msg.parts[0]?.text ?? '') }}
                      </span>
                    </UTooltip>
                  </div>
                </template>
              </UChatMessage>
            </template>
          </template>
        </UChatMessages>
      </div>

      <div class="p-3 border-t border-muted">
        <div class="flex gap-2">
          <UInput
            id="convos"
            v-model="input"
            :placeholder="t('conversations.placeholder')"
            size="md"
            class="flex-1"
            @keyup.enter="send"
          />
          <UButton
            icon="i-lucide-send"
            size="md"
            :disabled="!input.trim()"
            @click="send"
          />
        </div>
      </div>
    </main>
  </div>
</template>
