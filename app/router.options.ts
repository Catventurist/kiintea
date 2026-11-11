import type { RouterConfig } from '@nuxt/schema'

function scrollToHash(hash: string, tries = 20): Promise<void> {
  const id = decodeURIComponent(hash.slice(1))

  return new Promise((resolve) => {
    let attempt = 0
    const find = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (++attempt >= tries) return resolve()
      setTimeout(find, 50)
    }
    find()
  })
}

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()

    if (to.hash) {
      if (to.path === from.path) {
        scrollToHash(to.hash)
        return false
      }
      return new Promise((resolve) => {
        nuxtApp.hooks.hookOnce('page:finish', () => {
          scrollToHash(to.hash).then(() => resolve(false))
        })
      })
    }

    return savedPosition || false
  }
}
