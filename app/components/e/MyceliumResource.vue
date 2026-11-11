<script setup lang="ts">
import type { ColumnDef } from '@tanstack/table-core'

type Connection = { other: string, resource: string, flow: number, direction: string }

const props = defineProps<{ data: CommunityData }>()
const canvasRef = ref<HTMLCanvasElement>()

const dataRef = computed(() => props.data)
const {
  activeResources, resources, hoveredNode, selectedNode,
  toggleResource, selectedConnections, nodeStats, onMove, onClick
} = useMycelium(canvasRef, dataRef)

const { t } = useI18n()

const columns = computed<ColumnDef<Connection>[]>(() => [
  { accessorKey: 'other', header: t('community.table.node') },
  {
    accessorKey: 'resource',
    header: t('community.table.resource'),
    cell: ({ getValue }) => t(`community.resources.${getValue()}`)
  },
  { accessorKey: 'flow', header: t('community.table.flow') },
  {
    accessorKey: 'direction',
    header: t('community.table.dir'),
    cell: ({ getValue }) => t(`community.dir.${getValue()}`)
  }
])
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <UBadge
          :label="$t('community.network')"
          variant="subtle"
          color="primary"
        />
        <UFieldGroup size="sm">
          <UButton
            v-for="r in resources"
            :key="r"
            :label="$t(`community.resources.${r}`)"
            :color="activeResources.has(r) ? 'primary' : 'neutral'"
            :variant="activeResources.has(r) ? 'outline' : 'ghost'"
            size="sm"
            @click="toggleResource(r)"
          />
        </UFieldGroup>
      </div>
    </template>

    <UEmpty
      v-if="!data.nodes.length || !data.edges.length"
      icon="i-lucide-network"
      :title="$t('community.noData.title')"
      :description="$t('community.noData.description')"
      class="h-140"
    />

    <canvas
      v-else
      ref="canvasRef"
      :width="900"
      :height="560"
      class="w-full rounded-lg"
      @mousemove="onMove"
      @mouseleave="hoveredNode = null"
      @click="onClick"
    />

    <template #footer>
      <div class="flex items-center gap-4 text-xs text-muted">
        <div class="flex items-center gap-1.5">
          <span class="size-2.5 rounded-full bg-success" /> {{ $t('community.legend.producer') }}
        </div>
        <div class="flex items-center gap-1.5">
          <span class="size-2.5 rounded-full bg-error" /> {{ $t('community.legend.consumer') }}
        </div>
        <div class="flex items-center gap-1.5">
          <span class="size-2.5 rounded-full bg-warning" /> {{ $t('community.legend.both') }}
        </div>
        <div class="flex items-center gap-1.5 ml-auto">
          <span class="size-2 rounded-full bg-info" /> {{ $t('community.legend.flow') }}
        </div>
      </div>
    </template>

    <USlideover
      :open="!!selectedNode"
      :title="selectedNode?.name"
      @update:open="(v: boolean) => { if (!v) selectedNode = null }"
    >
      <template #body>
        <div
          v-if="selectedNode"
          class="space-y-4"
        >
          <UBadge
            :label="$t(`community.types.${selectedNode.type}`)"
            :color="selectedNode.type === 'producer' ? 'success' : selectedNode.type === 'consumer' ? 'error' : 'warning'"
            variant="subtle"
          />
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="rounded-lg bg-elevated p-3">
              <p class="text-xs text-muted">
                {{ $t('community.stats.in') }}
              </p>
              <p class="text-lg font-semibold text-success">
                {{ nodeStats(selectedNode).inFlow.toFixed(1) }}
              </p>
            </div>
            <div class="rounded-lg bg-elevated p-3">
              <p class="text-xs text-muted">
                {{ $t('community.stats.out') }}
              </p>
              <p class="text-lg font-semibold text-error">
                {{ nodeStats(selectedNode).outFlow.toFixed(1) }}
              </p>
            </div>
            <div class="rounded-lg bg-elevated p-3">
              <p class="text-xs text-muted">
                {{ $t('community.stats.links') }}
              </p>
              <p class="text-lg font-semibold">
                {{ nodeStats(selectedNode).connections }}
              </p>
            </div>
          </div>

          <USeparator class="my-4" />
          <UTable
            :data="selectedConnections"
            :columns="columns"
            :ui="{ base: 'text-sm' }"
          />
        </div>
      </template>
    </USlideover>
  </UCard>
</template>
