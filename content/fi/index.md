---
title: Koti
description: Interaktiivisia MDC-komponentteja Nuxt 4:lle, Nuxt UI v4:lle ja Nuxt Contentille.
seo:
  title: Koti
  description: Interaktiivisia MDC-komponentteja Nuxt 4:lle, Nuxt UI v4:lle ja Nuxt Contentille.
navigation:
  title: Koti
  icon: i-lucide-home
layout: default
sidebar: false
collapsed: false
splitter: false
toc: false
surround: false
---

::u-page-hero
---
headline: Nuxt 4
title: Kiinteä
description: Raahattavia komponentteja.
links:
  - label: Aloita
    to: /about
    variant: soft
    icon: i-lucide-square-play
  - label: Selaa ohjeita
    to: /guides
    color: neutral
    variant: subtle
    trailingIcon: i-lucide-arrow-right
---
::

::compat-matrix
---
columns:
  - Node 18
  - Node 20
  - Node 22
rows:
  - name: Nuxt UI
    support: [partial, supported, supported]
    note: Vaatii v4-version Node 18:lla.
  - name: Nuxt Content
    support: [supported, supported, supported]
---
::

:::u-page-section{class="mt-20"}
---
title: Kokeile heti
description: Valitse asetukset ja saat asennuskomennon.
---

::install-builder
---
manager: pnpm
packages:
  - "@nuxt/ui"
  - tailwindcss
options:
  - label: Nuxt Content
    package: "@nuxt/content"
    description: Markdown- ja MDC-tuki.
    checked: true
  - label: Nuxt Image
    package: "@nuxt/image"
    description: Optimoidut kuvat.
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Mitä saat
---

::card-list
---
items:
  - title: Listat
    description: Valintaruutu-, valintapainike- ja haitarilistat.
    to: /guides/tools
    icon: i-lucide-list-checks
    id: lists
  - title: Asettelun apuvälineet
    description: Kortit, välilehdet, vaiheistus ja aikajana.
    to: /guides/tools
    icon: i-lucide-layout-grid
    id: layout
  - title: Interaktiiviset taulut
    description: Vedä ja pudota -kanban-taulut.
    to: /guides/tools
    icon: i-lucide-kanban
    id: boards
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Asennus neljässä vaiheessa
---

::stepper-list
---
items:
  - title: Asenna
    description: Lisää moduulit.
    icon: i-lucide-download
  - title: Määritä
    description: Päivitä nuxt.config.ts.
    icon: i-lucide-settings
  - title: Lisää komponentit
    description: Kopioi tiedostot kansioon components/content.
    icon: i-lucide-puzzle
  - title: Julkaise
    description: Rakenna ja julkaise.
    icon: i-lucide-rocket
---
::

::progress-check
---
title: Asennuksen tarkistuslista
id: setup-checklist-fi
reset-label: Nollaa
items:
  - label: Asenna riippuvuudet
  - label: Määritä moduulit
  - label: Lisää ensimmäinen komponentti
  - label: Julkaise
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Uutta
---

::timeline-list
---
items:
  - date: 2.4.2026
    title: Etusivu
    description: Uusi etusivu toimivilla komponenteilla.
    icon: i-lucide-rocket
  - date: 22.3.2026
    title: Compat matrix
    description: Versiotuki yhdellä silmäyksellä.
    icon: i-lucide-table
---
::
:::

:::u-page-section{class="mt-20"}
---
title: UKK
---

::accordion-list
---
items:
  - label: Tukeeko se Nuxt 4:ää?
    content: Kyllä, kaikki komponentit on tehty Nuxt 4:lle ja Nuxt UI v4:lle.
    value: nuxt4
  - label: Onko dokumentaatio suomeksi?
    content: Kyllä, dokumentaatio on saatavilla englanniksi ja suomeksi.
    value: finnish
---
::
:::