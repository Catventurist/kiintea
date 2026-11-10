import type { PageCollections } from '@nuxt/content'

const layouts = ['default', 'dashboard'] as const

export default defineNuxtRouteMiddleware(async (to) => {
  const { $i18n } = useNuxtApp()
  const locale = $i18n.locale.value

  const collection = ('content_' + locale) as keyof PageCollections

  let page = await queryCollection(collection).path(to.path).select('layout').first()

  if (!page && locale !== 'en') {
    page = await queryCollection('content_en').path(to.path).select('layout').first()
  }

  const layout = layouts.find(l => l === page?.layout)
  if (layout) setPageLayout(layout)
})
