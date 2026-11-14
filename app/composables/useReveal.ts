import { useElementVisibility, useEventListener } from '@vueuse/core'

export function useScrollReveal(opts: {
  delay?: number
  distance?: number
  threshold?: number
} = {}) {
  const { delay = 0, distance = 30, threshold = 0.2 } = opts

  const el = useTemplateRef<HTMLElement>('reveal')
  const inView = useElementVisibility(el, { threshold })
  const visible = ref(false)
  watch(inView, (v) => {
    if (v) visible.value = true
  }, { immediate: true })

  const style = computed(() => ({
    '--rv-delay': `${delay}ms`,
    '--rv-distance': `${distance}px`
  }))

  return { el, visible, style }
}

export function useScrollyStory() {
  const container = useTemplateRef<HTMLElement>('scrolly')
  const steps = useTemplateRef<HTMLElement>('steps')
  const progress = ref(0)

  function update() {
    const el = steps.value ?? container.value
    if (!el) return

    const rect = el.getBoundingClientRect()
    const middle = window.innerHeight / 2
    const range = rect.height - middle

    const p = range > 0
      ? Math.min(1, Math.max(0, (middle - rect.top) / range))
      : 0

    progress.value = p > 0.99 ? 1 : p
  }

  onMounted(update)
  useEventListener('scroll', update, { passive: true, capture: true })
  useEventListener('resize', update, { passive: true })

  return { progress }
}
