<script setup lang="ts">
interface Node { id: string, name: string, x: number, y: number, type: 'producer' | 'consumer' | 'both' }

const data: CommunityData = {
  nodes: [
    { id: 'ana', name: 'Ana', x: 200, y: 150, type: 'producer' },
    { id: 'boris', name: 'Boris', x: 450, y: 200, type: 'both' },
    { id: 'carla', name: 'Carla', x: 350, y: 400, type: 'consumer' },
    { id: 'diego', name: 'Diego', x: 700, y: 300, type: 'producer' },
    { id: 'elena', name: 'Elena', x: 600, y: 450, type: 'both' },
    { id: 'franc', name: 'Franc', x: 150, y: 380, type: 'consumer' },
    { id: 'greta', name: 'Greta', x: 750, y: 120, type: 'producer' },
    { id: 'hugo', name: 'Hugo', x: 100, y: 250, type: 'both' }
  ],
  edges: [
    { from: 'ana', to: 'boris', resource: 'food', flow: 0.8, direction: 1 },
    { from: 'boris', to: 'carla', resource: 'food', flow: 0.6, direction: 1 },
    { from: 'diego', to: 'boris', resource: 'tools', flow: 0.4, direction: 1 },
    { from: 'boris', to: 'ana', resource: 'skills', flow: 0.3, direction: 1 },
    { from: 'diego', to: 'elena', resource: 'money', flow: 0.9, direction: 1 },
    { from: 'elena', to: 'carla', resource: 'food', flow: 0.5, direction: 1 },
    { from: 'ana', to: 'franc', resource: 'food', flow: 0.7, direction: 1 },
    { from: 'elena', to: 'boris', resource: 'skills', flow: 0.4, direction: 1 },
    { from: 'greta', to: 'diego', resource: 'food', flow: 0.6, direction: 1 },
    { from: 'greta', to: 'hugo', resource: 'tools', flow: 0.5, direction: 1 },
    { from: 'hugo', to: 'franc', resource: 'money', flow: 0.3, direction: 1 },
    { from: 'hugo', to: 'ana', resource: 'skills', flow: 0.4, direction: 1 },
    { from: 'carla', to: 'hugo', resource: 'food', flow: 0.2, direction: 1 }
  ]
}

const selectedNode = ref<Node | null>(null)
const { t } = useI18n()
const summaryLabel = computed(() => {
  const n = data.nodes.length ?? 0
  const e = data.edges.length ?? 0
  return `${n} ${t('community.nodes')} · ${e} ${t('community.links')}`
})

function onNodeClick(node: Node) {
  selectedNode.value = node
}
</script>

<template>
  <div class="p-6 h-full">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-2xl font-bold">
          {{ $t('community.title') }}
        </h1>
        <p class="text-sm text-muted mt-1">
          {{ $t('community.subtitle') }}
        </p>
      </div>
      <UBadge
        :label="summaryLabel"
        variant="subtle"
        color="neutral"
      />
    </div>

    <EMyceliumResource
      v-if="data"
      :data="data"
      :width="900"
      :height="560"
      @node-click="onNodeClick"
    />
  </div>
</template>
