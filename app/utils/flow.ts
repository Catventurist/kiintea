export const layers = ['knowledge', 'plan', 'observation', 'agent'] as const
export type Layer = typeof layers[number]

export const layerMeta: Record<Layer, { icon: string, color: 'info' | 'warning' | 'success' | 'primary' }> = {
  knowledge: { icon: 'i-lucide-book-open', color: 'info' },
  plan: { icon: 'i-lucide-calendar-check', color: 'warning' },
  observation: { icon: 'i-lucide-eye', color: 'success' },
  agent: { icon: 'i-lucide-users', color: 'primary' }
}

export function sortFlows<T extends { layer: string, title: string }>(items: T[]): T[] {
  return [...items].sort((a, b) =>
    layers.indexOf(a.layer as Layer) - layers.indexOf(b.layer as Layer)
    || a.title.localeCompare(b.title)
  )
}

export interface FinderSkill {
  name: string
  level: number
  years?: number
  note?: string
}

export interface FinderLearning {
  name: string
  progress?: number
  goal?: string
}

export interface FinderMember {
  name: string
  to?: string
  role?: string
  since?: number
  availability?: string
  openToHelp?: boolean
  skills: FinderSkill[]
  learning?: FinderLearning[]
  projects?: { title: string, to: string }[]
}
