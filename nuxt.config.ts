import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/i18n'
  ],
  devtools: { enabled: false },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'dark',
    fallback: 'light',
    storage: 'sessionStorage'
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml'],
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          }
        }
      }
    },
    experimental: {
      sqliteConnector: 'bun'
    }
  },
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
    },
    experimental: {
      componentDetection: true
    }
  },
  /* WebMCP
   routeRules: {
    '/**': {
      headers: {
        'Permissions-Policy': 'tools=()'
      }
    }
  }, */
  compatibilityDate: '2026-11-10',
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en', '/fi']
    },
    vercel: {
      functions: {
        runtime: 'bun1.x'
      }
    }
  },
  vite: {
    optimizeDeps: {
      include: [
        '@shikijs/core',
        '@shikijs/engine-javascript',
        '@shikijs/engine-oniguruma',
        '@shikijs/langs/css',
        '@shikijs/langs/html',
        '@shikijs/langs/markdown',
        '@shikijs/langs/mdc',
        '@shikijs/langs/shellscript',
        '@shikijs/langs/typescript',
        '@shikijs/langs/vue',
        '@shikijs/langs/yaml',
        '@shikijs/transformers',
        'shiki/wasm',
        '@shikijs/themes/github-dark',
        '@shikijs/themes/github-light',
        '@shikijs/themes/material-theme-lighter',
        '@vueuse/integrations/useSortable'
      ]
    }
  },
  telemetry: false,
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  fonts: {
    provider: 'bunny',
    defaults: {
      preload: true,
      styles: ['normal'],
      subsets: ['latin']
    },
    families: [
      { name: 'Finlandica', weights: [400, 600], preload: true, display: 'swap' },
      { name: 'Chivo Mono', weights: [400], subsets: ['latin'], preload: false }
    ]
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix',
    locales: [
      { code: 'en', name: 'English', language: 'en-US', flag: '🇺🇸', dir: 'ltr', file: 'en.yml', icon: 'i-social-usa' },
      { code: 'fi', name: 'Suomi', language: 'fi-FI', flag: '🇫🇮', dir: 'ltr', file: 'fi.yml', icon: 'i-social-finland' }
    ],
    detectBrowserLanguage: {
      useCookie: false,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  icon: {
    customCollections: [
      { prefix: 'social', dir: resolve('./app/assets/icons') }
    ],
    clientBundle: {
      includeCustomCollections: true
    }
  }
})
