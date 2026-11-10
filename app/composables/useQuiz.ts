import { useSortable, moveArrayElement } from '@vueuse/integrations/useSortable'
import type { SortableEvent } from 'sortablejs'

export interface QuizItem { id: number, label: string }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

export function useSortQuiz(
  el: Ref<HTMLElement | null>,
  source: () => string[]
) {
  const list = ref<QuizItem[]>([])
  const result = ref<boolean | null>(null)
  const animate = ref<'shake' | 'pop' | null>(null)
  const touched = ref(false)
  const attempts = ref(0)

  const isSolved = (items: QuizItem[]) => items.every((item, i) => item.id === i)

  function reset() {
    const items = source().map((label, id): QuizItem => ({ id, label }))
    let next = shuffle(items)
    while (items.length > 1 && isSolved(next)) next = shuffle(items)

    list.value = next
    result.value = null
    animate.value = null
    touched.value = false
    attempts.value = 0
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir
    if (target < 0 || target >= list.value.length) return
    moveArrayElement(list, index, target)
    touched.value = true
    result.value = null
    nextTick(() => {
      el.value
        ?.querySelectorAll<HTMLElement>('[data-move]')[target * 2 + (dir === -1 ? 0 : 1)]
        ?.focus()
    })
  }

  function check() {
    attempts.value++
    result.value = isSolved(list.value)
    animate.value = null
    nextTick(() => {
      animate.value = result.value ? 'pop' : 'shake'
    })
  }

  onMounted(reset)

  useSortable(el, list, {
    animation: 200,
    handle: '[data-handle]',
    ghostClass: 'quiz-ghost',
    chosenClass: 'quiz-chosen',
    dragClass: 'quiz-drag',
    onStart: () => { result.value = null },
    onUpdate: (e: SortableEvent) => {
      moveArrayElement(list, e.oldIndex!, e.newIndex!)
      touched.value = true
    }
  })

  return { list, result, animate, touched, attempts, isSolved, reset, move, check }
}
