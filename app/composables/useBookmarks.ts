import type { ShallowRef } from 'vue'
import type { TreeItem } from '@nuxt/ui'
import { useSortable } from '@vueuse/integrations/useSortable'

export interface BookmarkItem extends TreeItem {
  id: string
  url?: string
  children?: BookmarkItem[]
}

interface Leaf { id: string, label: string, url: string, folder: string }

function flatten(items: BookmarkItem[]): BookmarkItem[] {
  return items.flatMap(i => [i, ...flatten(i.children ?? [])])
}

function flattenVisible(items: BookmarkItem[], expanded: string[]): { item: BookmarkItem, parent: BookmarkItem[], index: number }[] {
  return items.flatMap((item, index) => [
    { item, parent: items, index },
    ...(item.children?.length && expanded.includes(item.id) ? flattenVisible(item.children, expanded) : [])
  ])
}

function filterTree(items: BookmarkItem[], s: string): BookmarkItem[] {
  return items.flatMap((i): BookmarkItem[] => {
    if (!i.children) return `${i.label} ${i.url}`.toLowerCase().includes(s) ? [i] : []
    if (i.label?.toLowerCase().includes(s)) return [i]
    const children = filterTree(i.children, s)
    return children.length ? [{ ...i, children }] : []
  })
}

function leaves(items: BookmarkItem[], path: string[] = []): Leaf[] {
  return items.flatMap(i => i.children
    ? leaves(i.children, [...path, i.label ?? ''])
    : [{ id: i.id, label: i.label ?? '', url: i.url!, folder: path.join(' / ') }])
}

function parseBookmarks(doc: Document) {
  let bookmarkCount = 0
  let folderCount = 0

  const walk = (dl: Element): BookmarkItem[] =>
    Array.from(dl.children).flatMap((dt): BookmarkItem[] => {
      if (dt.tagName !== 'DT') return []

      const a = dt.querySelector<HTMLAnchorElement>(':scope > a')
      if (a) {
        return [{
          id: `bookmark-${bookmarkCount++}`,
          label: a.textContent?.trim() ?? '',
          url: a.href,
          icon: 'i-lucide-link'
        }]
      }

      const name = dt.querySelector(':scope > h3')?.textContent?.replace('§', '').trim()
      const sub = dt.querySelector(':scope > dl')
        ?? (dt.nextElementSibling?.tagName === 'DL' ? dt.nextElementSibling : null)
      if (!name || !sub) return []

      const children = walk(sub)
      return children.length ? [{ id: `folder-${folderCount++}`, label: name, children }] : []
    })

  const root = doc.querySelector('dl')
  const items = root ? walk(root) : []

  return { items, count: bookmarkCount, valid: !!root }
}

function toYaml(list: Leaf[]) {
  const q = (s: string) => /^[!&*|>%@`[\\{,?-]|: | #|^$/.test(s) ? `'${s.replace(/'/g, '\'\'')}'` : s
  return list
    .map(i => `- title: ${q(i.label.replace(/–/g, '-'))}\n  url: ${i.url}\n  folder: ${q(i.folder)}`)
    .join('\n')
}

function download(list: Leaf[]) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([toYaml(list)], { type: 'text/yaml' }))
  a.download = 'bookmarks.yml'
  a.click()
  URL.revokeObjectURL(a.href)
}

export function useBookmarks(list: Readonly<ShallowRef<HTMLElement | null>>) {
  const { t } = useI18n()
  const toast = useToast()

  const tree = shallowRef<BookmarkItem[]>([])
  const selected = shallowRef<BookmarkItem[]>([])
  const expanded = ref<string[]>([])
  const query = ref('')
  const total = ref(0)
  const uploadId = ref(0)
  const reorder = ref(false)

  const getKey = (i: BookmarkItem) => i.id

  const selectedCount = computed(() => selected.value.filter(i => i.url).length)

  const filtered = computed(() => {
    const s = query.value.trim().toLowerCase()
    return s ? filterTree(tree.value, s) : [...tree.value]
  })

  watch(query, (q) => {
    expanded.value = q.trim() ? flatten(filtered.value).filter(i => i.children).map(i => i.id) : []
  })

  function fail(description: string, color: 'error' | 'warning' = 'error') {
    toast.add({
      title: t('bookmarks.error.title'),
      description,
      color,
      icon: color === 'error' ? 'i-lucide-circle-alert' : 'i-lucide-triangle-alert'
    })
    tree.value = []
    total.value = 0
    return false
  }

  /** Parses a bookmarks HTML file. Returns false (and shows a toast) on failure. */
  async function load(file: File) {
    let result: ReturnType<typeof parseBookmarks>
    try {
      result = parseBookmarks(new DOMParser().parseFromString(await file.text(), 'text/html'))
    } catch {
      return fail(t('bookmarks.error.invalid'))
    }

    if (!result.valid) return fail(t('bookmarks.error.invalid'))
    if (!result.count) return fail(t('bookmarks.error.empty'), 'warning')

    tree.value = result.items
    total.value = result.count
    selected.value = []
    expanded.value = []
    query.value = ''
    uploadId.value++
    return true
  }

  function selectAll() {
    const map = new Map(selected.value.map(i => [i.id, i]))
    flatten(filtered.value).forEach(i => map.set(i.id, i))
    selected.value = [...map.values()]
  }

  function clearSelection() {
    selected.value = []
  }

  function exportAll() {
    download(leaves(tree.value))
  }

  function exportSelected() {
    const ids = new Set(selected.value.map(i => i.id))
    download(leaves(tree.value).filter(i => ids.has(i.id)))
  }

  function moveItem(oldIndex: number, newIndex: number) {
    if (oldIndex === newIndex) return

    const flat = flattenVisible(tree.value, expanded.value)
    const source = flat[oldIndex]
    const target = flat[newIndex]
    if (!source || !target) return

    if (source.item.children && flatten(source.item.children).includes(target.item)) return

    source.parent.splice(source.index, 1)

    const updatedTarget = flattenVisible(tree.value, expanded.value).find(({ item }) => item === target.item)
    if (!updatedTarget) return

    const movingDown = oldIndex < newIndex
    const dropIntoFolder = movingDown
      && updatedTarget.item.children
      && expanded.value.includes(updatedTarget.item.id)

    if (dropIntoFolder) {
      updatedTarget.item.children!.unshift(source.item)
    } else {
      updatedTarget.parent.splice(movingDown ? updatedTarget.index + 1 : updatedTarget.index, 0, source.item)
    }
  }

  const { start, stop, option } = useSortable(list, tree, {
    animation: 150,
    ghostClass: 'opacity-50',
    disabled: true,
    onUpdate: ({ oldIndex, newIndex }: { oldIndex?: number, newIndex?: number }) => {
      if (oldIndex === undefined || newIndex === undefined) return
      moveItem(oldIndex, newIndex)
      nextTick(() => triggerRef(tree))
    }
  })

  watch([reorder, query], async ([r, q]) => {
    stop()
    if (!r || q) return
    await nextTick()
    start()
    option('disabled', false)
  }, { flush: 'post' })

  return {
    tree,
    selected,
    expanded,
    query,
    total,
    uploadId,
    reorder,
    filtered,
    selectedCount,
    getKey,
    load,
    selectAll,
    clearSelection,
    exportAll,
    exportSelected
  }
}
