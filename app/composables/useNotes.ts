const DIVIDER = /^=== (\/\S*) ===$/

export function useNotes() {
  const route = useRoute()
  const { locales } = useI18n()

  const notes = useState<Record<string, string>>('notes', () => ({}))

  const pageKey = computed(() => {
    const codes = locales.value.map(entry => typeof entry === 'string' ? entry : entry.code)
    const prefix = new RegExp(`^/(${codes.join('|')})(?=/|$)`)
    return route.path.replace(prefix, '') || '/'
  })

  const current = computed({
    get: () => notes.value[pageKey.value] ?? '',
    set: (value: string) => {
      const rest = Object.fromEntries(
        Object.entries(notes.value).filter(([path]) => path !== pageKey.value)
      )
      notes.value = value ? { ...rest, [pageKey.value]: value } : rest
    }
  })

  const entries = computed(() =>
    Object.entries(notes.value)
      .filter(([, text]) => text.trim().length > 0)
      .map(([path, text]) => ({ path, text }))
      .sort((a, b) => a.path.localeCompare(b.path))
  )

  const others = computed(() => entries.value.filter(entry => entry.path !== pageKey.value))
  const count = computed(() => entries.value.length)

  function serialize() {
    return entries.value
      .map(entry => `=== ${entry.path} ===\n${entry.text.trim()}\n`)
      .join('\n')
  }

  function parse(raw: string) {
    const result: Record<string, string> = {}
    let path: string | null = null
    let lines: string[] = []

    const flush = () => {
      if (path) {
        const text = lines.join('\n').trim()
        if (text) result[path] = text
      }
      lines = []
    }

    for (const line of raw.replace(/\r\n/g, '\n').split('\n')) {
      const match = line.match(DIVIDER)
      if (match) {
        flush()
        path = match[1] as string
      } else if (path) {
        lines.push(line)
      }
    }
    flush()
    return result
  }

  function download() {
    const blob = new Blob([serialize()], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `notes-${new Date().toISOString().slice(0, 10)}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  async function importFile(file: File) {
    const imported = parse(await file.text())
    const total = Object.keys(imported).length
    if (total) notes.value = { ...notes.value, ...imported }
    return total
  }

  function clear() {
    notes.value = {}
  }

  return { pageKey, current, others, count, download, importFile, clear }
}
