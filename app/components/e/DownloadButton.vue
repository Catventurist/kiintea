<script setup lang="ts">
const props = defineProps<{
  page?: { title?: string, path?: string, rawbody?: string } | null
}>()

const { t, locale } = useI18n()

const available = computed(() => !!props.page?.rawbody)

function fileName(path = '') {
  const parts = path.split('/').filter(Boolean)
  if (parts[0] === locale.value) parts.shift()
  return `${parts.join('-') || 'index'}.md`
}

function download() {
  const page = props.page
  if (!page?.rawbody) return

  const body = page.rawbody.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trim()
  const hasTitle = /^#\s/.test(body)
  const text = (page.title && !hasTitle ? `# ${page.title}\n\n` : '') + body + '\n'

  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName(page.path)
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <UButton
    icon="i-lucide-file-down"
    color="neutral"
    variant="ghost"
    size="sm"
    :label="t('common.download.markdown')"
    :disabled="!available"
    @click="download"
  />
</template>
