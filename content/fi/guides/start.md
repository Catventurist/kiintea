---
title: Alku
description: Asenna ja muokkaa haluamaksesi.
navigation:
  title: Alku
  icon: i-lucide-rocket
layout: dashboard
sidebar: true
collapsed: false
splitter: true
toc: true
surround: true
---

## Alku

Asenna Bunilla

```bash
npm create nuxt@latest
bun add @nuxt/ui tailwindcss eslint-plugin-better-tailwindcss @nuxt/content @nuxtjs/i18n @vueuse/integrations sortablejs
bun add -D vue-tsc typescript eslint @iconify-json/lucide
```

## Komentoja

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

## Niksejä

- Verceliä käytettäessä tarvitaan `bun add better-sqlite3`.

## Vältä

::warning
Vältä käyttämästä näitä **EU**-alueella. Säästää päänvaivaa ja byrokratiaa.
- useCookie
- localStorage
- Analytiikka
- Upotetut ulkopuoliset sisällöt (videot, kartat, kalenterit)
::
