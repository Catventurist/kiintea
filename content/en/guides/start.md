---
title: Getting started
description: Install and set up the project
navigation:
  title: Start
  icon: i-lucide-rocket
layout: dashboard
sidebar: true
collapsed: false
splitter: true
toc: true
surround: true
---

## From scratch

Install with Bun

```bash
npm create nuxt@latest
bun add @nuxt/ui tailwindcss eslint-plugin-better-tailwindcss @nuxt/content @nuxtjs/i18n @vueuse/integrations sortablejs
bun add -D vue-tsc typescript eslint @iconify-json/lucide

```

## Commands

```bash
bun dev
bun run lint --fix
bun run typecheck
bun update
bun upgrade
bunx nuxi cleanup
bun run build
bun preview
npx nuxi analyze
npx nuxi@latest module add @nuxtjs/i18n
```

## Tips

- When deployed on Vercel, need `bun add better-sqlite3`.

## Avoid

::warning
Don't add these in **EU**. Saves time and penalties.
- useCookie
- localStorage
- Analytics
- Embedded third-party content (videos, maps, calendars)
::
