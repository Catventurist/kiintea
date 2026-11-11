export type Resource = 'food' | 'tools' | 'skills' | 'money' | 'time'

export interface CommunityNode {
  id: string
  name: string
  x: number
  y: number
  type: 'producer' | 'consumer' | 'both'
}

export interface CommunityEdge {
  from: string
  to: string
  resource: Resource
  flow: number
  direction: 1 | -1
}

export interface CommunityData {
  nodes: CommunityNode[]
  edges: CommunityEdge[]
}

export function useMycelium(canvasRef: Ref<HTMLCanvasElement | undefined>, data: Ref<CommunityData>) {
  let raf: number | null = null

  const activeResources = ref<Set<Resource>>(new Set())
  const hoveredNode = ref<CommunityNode | null>(null)
  const selectedNode = ref<CommunityNode | null>(null)
  const selectedConnections = ref<ReturnType<typeof nodeConnections>>([])
  const resources = computed(() => {
    const set = new Set<Resource>()
    for (const e of data.value.edges) set.add(e.resource)
    return [...set]
  })

  function toggleResource(r: Resource) {
    if (activeResources.value.has(r)) activeResources.value.delete(r)
    else activeResources.value.add(r)
    if (activeResources.value.size === 0) activeResources.value = new Set(resources.value)
  }

  function visibleEdges() {
    return data.value.edges.filter(e => activeResources.value.has(e.resource))
  }

  function colorFor(n: CommunityNode) {
    if (n.type === 'producer') return '#34d399'
    if (n.type === 'consumer') return '#f87171'
    return '#fbbf24'
  }

  function nodeRadius(n: CommunityNode) {
    const edges = visibleEdges()
    const degree = edges.filter(e => e.from === n.id || e.to === n.id).length
    return 6 + Math.min(degree * 1.5, 12)
  }

  function nodeConnections(n: CommunityNode) {
    return visibleEdges()
      .filter(e => e.from === n.id || e.to === n.id)
      .map((e) => {
        const otherId = e.from === n.id ? e.to : e.from
        const other = data.value.nodes.find(nd => nd.id === otherId)
        return {
          other: other?.name ?? otherId,
          resource: e.resource,
          flow: e.flow,
          direction: (e.from === n.id ? 'out' : 'in') as 'in' | 'out'
        }
      })
  }

  function nodeStats(n: CommunityNode) {
    const conns = nodeConnections(n)
    const inFlow = conns.filter(c => c.direction === 'in').reduce((a, c) => a + c.flow, 0)
    const outFlow = conns.filter(c => c.direction === 'out').reduce((a, c) => a + c.flow, 0)
    return { inFlow, outFlow, connections: conns.length }
  }

  interface Particle { edgeIdx: number, t: number, speed: number, dir: 1 | -1 }
  const particles = ref<Particle[]>([])

  function initParticles() {
    particles.value = []
    const edges = visibleEdges()
    for (let i = 0; i < edges.length; i++) {
      const count = Math.max(1, Math.round(edges[i]!.flow * 8))
      for (let j = 0; j < count; j++) {
        particles.value.push({
          edgeIdx: i,
          t: Math.random(),
          speed: 0.006 * (0.6 + Math.random() * 0.8),
          dir: edges[i]!.direction
        })
      }
    }
  }

  function draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.fillStyle = '#0b0f14'
    ctx.fillRect(0, 0, width, height)

    const edges = visibleEdges()
    const nodeMap = new Map(data.value.nodes.map(n => [n.id, n]))

    for (const e of edges) {
      const a = nodeMap.get(e.from)
      const b = nodeMap.get(e.to)
      if (!a || !b) continue
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.strokeStyle = '#60a5fa'
      ctx.globalAlpha = 0.15 + e.flow * 0.75
      ctx.lineWidth = 0.5 + e.flow * 3
      ctx.stroke()
    }
    ctx.globalAlpha = 1

    for (const n of data.value.nodes) {
      const r = nodeRadius(n)
      const isHovered = hoveredNode.value?.id === n.id
      const isSelected = selectedNode.value?.id === n.id
      ctx.beginPath()
      ctx.arc(n.x, n.y, isHovered || isSelected ? r + 3 : r, 0, Math.PI * 2)
      ctx.fillStyle = colorFor(n)
      ctx.fill()
      if (isSelected) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2)
        ctx.strokeStyle = colorFor(n)
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.6
        ctx.stroke()
        ctx.globalAlpha = 1
      }
      ctx.font = '11px system-ui'
      ctx.fillStyle = '#94a3b8'
      ctx.textAlign = 'center'
      ctx.fillText(n.name, n.x, n.y + r + 14)
    }

    for (const p of particles.value) {
      const e = edges[p.edgeIdx]
      if (!e) continue
      const a = nodeMap.get(e.from)
      const b = nodeMap.get(e.to)
      if (!a || !b) continue
      const x = a.x + (b.x - a.x) * p.t
      const y = a.y + (b.y - a.y) * p.t
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fillStyle = '#60a5fa'
      ctx.shadowColor = '#60a5fa'
      ctx.shadowBlur = 4
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }

  function update() {
    for (const p of particles.value) {
      p.t += p.speed * p.dir
      if (p.t >= 1 || p.t <= 0) p.t = p.dir === 1 ? 0 : 1
    }
  }

  function loop() {
    const ctx = canvasRef.value?.getContext('2d')
    if (!ctx) return
    update()
    draw(ctx, canvasRef.value!.width, canvasRef.value!.height)
    raf = requestAnimationFrame(loop)
  }

  function hitTest(mx: number, my: number): CommunityNode | null {
    for (const n of data.value.nodes) {
      const dx = mx - n.x
      const dy = my - n.y
      const r = nodeRadius(n) + 4
      if (dx * dx + dy * dy < r * r) return n
    }
    return null
  }

  function onMove(ev: MouseEvent) {
    if (!canvasRef.value) return
    const rect = canvasRef.value.getBoundingClientRect()
    const mx = (ev.clientX - rect.left) * (canvasRef.value.width / rect.width)
    const my = (ev.clientY - rect.top) * (canvasRef.value.height / rect.height)
    const node = hitTest(mx, my)
    if (node?.id !== hoveredNode.value?.id) {
      hoveredNode.value = node
      canvasRef.value.style.cursor = node ? 'pointer' : 'default'
    }
  }

  function onClick(ev: MouseEvent) {
    if (!canvasRef.value) return
    const rect = canvasRef.value.getBoundingClientRect()
    const mx = (ev.clientX - rect.left) * (canvasRef.value.width / rect.width)
    const my = (ev.clientY - rect.top) * (canvasRef.value.height / rect.height)
    const node = hitTest(mx, my)
    if (node) selectedNode.value = node
  }

  watch(data, (d) => {
    if (!d.nodes.length) return
    activeResources.value = new Set(resources.value)
    initParticles()
    if (!raf) loop()
  }, { deep: true, immediate: true })

  watch(activeResources, () => initParticles())

  watch(selectedNode, (n) => {
    selectedConnections.value = n ? nodeConnections(n) : []
  })
  onMounted(() => {
    if (!data.value.nodes.length) return
    activeResources.value = new Set(resources.value)
    initParticles()
    loop()
  })
  onBeforeUnmount(() => {
    if (raf) cancelAnimationFrame(raf)
  })

  return {
    activeResources,
    resources,
    hoveredNode,
    selectedNode,
    selectedConnections,
    toggleResource,
    nodeConnections,
    nodeStats,
    onMove,
    onClick
  }
}
