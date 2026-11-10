import type { Collections } from '@nuxt/content'
import type { DefineComponent } from 'vue'

export interface SiteStats {
  components: number | null
  pages: number | null
  coverage: number | null
  languages: number | null
  glossary: number | null
  problems: number | null
}

const modules = import.meta.glob<{ default: DefineComponent }>('~/components/content/*.vue')

export function useSiteStats() {
  const { locale, locales } = useI18n()

  return useAsyncData<SiteStats>(
    () => `site-stats-${locale.value}`,
    async () => {
      const count = (name: string) =>
        queryCollection(name as keyof Collections).count().catch(() => null)

      const [pagesEn, pagesFi, glossary, problems] = await Promise.all([
        count('content_en'),
        count('content_fi'),
        count('glossary_en'),
        count('problems_en')
      ])

      const current = locale.value === 'fi' ? pagesFi : pagesEn
      const coverage = pagesEn && pagesFi !== null
        ? Math.min(100, Math.round((pagesFi / pagesEn) * 100))
        : null

      return {
        components: Object.keys(modules).length,
        pages: current,
        coverage,
        languages: locales.value.length,
        glossary,
        problems
      }
    },
    { watch: [locale] }
  )
}
