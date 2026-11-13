import type { Collections, ContentNavigationItem, PageCollections, GlossaryEnCollectionItem, GlossaryFiCollectionItem } from '@nuxt/content'
import { findPageChildren } from '@nuxt/content/utils'
import type { NavigationMenuItem } from '@nuxt/ui'

export type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral' | undefined

interface Page {
  key: string
  icon: string
  path?: string
  children?: Page[]
}

export function useNavItems() {
  const route = useRoute()
  const localePath = useLocalePath()
  const { t } = useI18n()

  const pages: Page[] = [
    { key: 'about', path: '/about', icon: 'i-lucide-info' },
    {
      key: 'community',
      icon: 'i-lucide-users',
      children: [
        { key: 'example', path: '/example', icon: 'i-lucide-flask-conical' },
        { key: 'fire', path: '/fire', icon: 'i-lucide-flame' },
        { key: 'flow', path: '/flow', icon: 'i-lucide-workflow' },
        { key: 'glossary', path: '/glossary', icon: 'i-lucide-book-open' },
        { key: 'runo', path: '/runo', icon: 'i-lucide-lock-keyhole' },
        { key: 'viikot', path: '/viikot', icon: 'i-lucide-calendar-days' }
      ]
    },
    { key: 'guides', path: '/guides', icon: 'i-lucide-book' }
  ]

  const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)

  const toItem = (page: Page): NavigationMenuItem => {
    const label = t(`nav.${page.key}`)

    if (page.children) {
      const children = page.children.map(toItem)
      return {
        label,
        icon: page.icon,
        defaultOpen: children.some(c => c.active),
        children
      }
    }

    const to = localePath(page.path!)
    return { label, icon: page.icon, to, active: isActive(to) }
  }

  const navItems = computed<NavigationMenuItem[]>(() => pages.map(toItem))

  return { navItems }
}

export const useRouteLocale = () => {
  const route = useRoute()
  const { locales, defaultLocale } = useI18n()

  return computed(() => {
    const seg = route.path.split('/')[1]
    const codes: string[] = locales.value.map(l => typeof l === 'string' ? l : l.code)
    return (seg && codes.includes(seg) ? seg : defaultLocale) as typeof defaultLocale
  })
}

export function useContentCollection() {
  const route = useRoute()
  const locale = useRouteLocale()

  const collection = computed(() => `content_${locale.value}` as keyof PageCollections)

  const page = useAsyncData(
    () => `page-${route.path}`,
    () => queryCollection(collection.value).path(route.path).first(),
    { watch: [() => route.path] }
  )

  const navigation = useAsyncData(
    () => `navigation-${locale.value}`,
    async () => {
      const tree = await queryCollectionNavigation(collection.value)
      return findPageChildren(tree, `/${locale.value}`)
    },
    { watch: [locale], default: () => [] as ContentNavigationItem[] }
  )

  const files = useLazyAsyncData(
    () => `search-${locale.value}`,
    () => queryCollectionSearchSections(collection.value, { ignoredTags: ['style'] }),
    { server: false, watch: [locale] }
  )

  const surround = useAsyncData(
    () => `surround-${route.path}`,
    () => queryCollectionItemSurroundings(collection.value, route.path, {
      fields: ['title', 'description']
    }),
    { watch: [() => route.path] }
  )

  const ready = Promise.all([page, navigation, surround])

  return {
    locale,
    collection,
    page: page.data,
    navigation: navigation.data,
    files: files.data,
    surround: surround.data,
    ready
  }
}

interface Preferences {
  sidebar?: boolean
  toc?: boolean
  collapsed?: boolean
  splitter?: boolean
  surround?: boolean
}

export function usePreferences() {
  const preferences = useState<Preferences>('preferences', () => ({}))

  function set<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    preferences.value = { ...preferences.value, [key]: value }
  }

  function reset(key?: keyof Preferences) {
    if (!key) {
      preferences.value = {}
      return
    }
    const { [key]: _, ...rest } = preferences.value
    preferences.value = rest
  }

  return { preferences, set, reset }
}

export function usePageOptions() {
  const route = useRoute()
  const locale = useRouteLocale()
  const { page } = useContentCollection()
  const { preferences, set } = usePreferences()

  const depth = computed(() => route.path
    .replace(new RegExp(`^/${locale.value}(?=/|$)`), '')
    .split('/')
    .filter(Boolean)
    .length)

  const defaults = computed(() => ({
    sidebar: depth.value >= 1,
    toc: depth.value >= 2,
    collapsed: false,
    splitter: depth.value >= 3,
    surround: depth.value >= 2
  }))

  const options = computed(() => ({
    sidebar: preferences.value.sidebar ?? page.value?.sidebar ?? defaults.value.sidebar,
    toc: preferences.value.toc ?? page.value?.toc ?? defaults.value.toc,
    collapsed: preferences.value.collapsed ?? page.value?.collapsed ?? defaults.value.collapsed,
    splitter: preferences.value.splitter ?? page.value?.splitter ?? defaults.value.splitter,
    surround: preferences.value.surround ?? page.value?.surround ?? defaults.value.surround
  }))
  const { reset } = usePreferences()
  watch(() => route.path, () => reset())
  return { options, set }
}

export interface ProblemEntry {
  slug: string
  problem: string
  cause: string
  fix: string
  severity?: 'error' | 'warning' | 'info'
  tags?: string[]
  since?: string
  code?: { lang?: string, file?: string, content: string }
  links?: { label: string, to: string }[]
  id?: string
}

export function useProblems(tag?: MaybeRefOrGetter<string | undefined>) {
  const { data: pool } = useLocalizedPool<ProblemEntry>('problems', entry => entry.slug)

  const items = computed(() => {
    const wanted = toValue(tag)
    const list = pool.value ?? []
    const filtered = wanted ? list.filter(entry => (entry.tags ?? []).includes(wanted)) : list
    return filtered.map(({ slug, id: _contentId, ...rest }) => ({ ...rest, id: slug }))
  })

  return { items, pool }
}

const DEFAULT_LOCALE = 'en'

export function useLocalizedPool<T>(
  name: string,
  keyOf: (entry: T) => string
) {
  const { locale } = useI18n()

  return useAsyncData<T[]>(
    () => `pool-${name}-${locale.value}`,
    async () => {
      const read = (collection: string) =>
        queryCollection(collection as keyof Collections).all() as unknown as Promise<T[]>

      if (locale.value === DEFAULT_LOCALE) return await read(`${name}_en`)

      const [base, local] = await Promise.all([
        read(`${name}_en`),
        read(`${name}_${locale.value}`)
      ])

      const merged = new Map(base.map(entry => [keyOf(entry), entry] as const))
      for (const entry of local) merged.set(keyOf(entry), entry)
      return [...merged.values()]
    },
    { watch: [locale], default: () => [] as T[] }
  )
}

type GlossaryItem = GlossaryEnCollectionItem | GlossaryFiCollectionItem

export function useGlossary() {
  const { data: entries } = useLocalizedPool<GlossaryItem>(
    'glossary',
    entry => entry.stem.split('/').pop() as string
  )

  const byName = computed(() =>
    new Map((entries.value ?? []).map(entry => [entry.stem.split('/').pop() as string, entry] as const))
  )

  return { entries, byName }
}
