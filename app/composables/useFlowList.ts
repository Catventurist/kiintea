import type { Collections, FlowEnCollectionItem, FlowFiCollectionItem } from '@nuxt/content'

export function useFlowList() {
  const { locale } = useI18n()

  return useAsyncData(() => `flow-list-${locale.value}`, async () => {
    const items = await queryCollection(('flow_' + locale.value) as keyof Collections).all()

    if (!items.length && locale.value !== 'en') {
      return await queryCollection('flow_en').all()
    }
    return items as FlowEnCollectionItem[] | FlowFiCollectionItem[]
  }, { watch: [locale] })
}
