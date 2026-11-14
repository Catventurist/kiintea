---
title: Koti
description: Suomalaisen yhteisön interaktiivisia MDC-komponentteja Nuxt 4:lle, Nuxt UI v4:lle ja Nuxt Contentille.
seo:
  title: Koti
  description: Suomalaisen yhteisön interaktiivisia MDC-komponentteja Nuxt 4:lle, Nuxt UI v4:lle ja Nuxt Contentille.
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
headline: Kiinteä yhteisö
title: Rakennetaan yhdessä
description: Raahattavia MDC-komponentteja, jotka on tehty suomeksi ja jaettu avoimesti. Kopioi, muokkaa ja paranna.
links:
  - label: Aloita
    to: /about
    variant: soft
    icon: i-lucide-square-play
    class: 'hover:animate-dancing'
  - label: Selaa ohjeita
    to: /guides
    color: neutral
    variant: subtle
    trailingIcon: i-lucide-arrow-right
  - label: Katsele kirjastoa
    to: https://github.com/Catventurist/kiintea
    target: _blank
    color: secondary
    variant: outline
    icon: i-social-github
---
::

:::u-page-section
---
title: Mitä saat
description: Valmiita komponentteja, jotka toimivat suoraan Nuxt Contentin Markdownissa.
---

::card-list
---
items:
  - title: Listat
    description: Valintaruutu-, valintapainike- ja haitarilistat.
    to: /guides/tools
    icon: i-lucide-list-checks
    id: lists
    target: _blank
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
  - date: 11.11.2026
    title: Etusivu
    description: Uusi etusivu toimivilla komponenteilla ja yhteisöosiolla.
    icon: i-lucide-rocket
  - date: 10.11.2026
    title: Resurssikuvaaja
    description: Yhteisön toimintaa.
    icon: i-lucide-table
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Yhteisö
description: Tämä on tehty yhdessä. Jokainen komponentti, käännös ja korjaus on tervetullut.
---

::card-list
---
items:
  - title: Osallistu
    description: Ehdota uusia komponentteja tai paranna olemassa olevia GitHubissa.
    to: https://github.com/Catventurist/kiintea/pulls
    target: _blank
    icon: i-lucide-git-pull-request
    id: contribute
  - title: Ilmoita ongelmasta
    description: Löysitkö virheen tai kirjoitusvirheen? Kerro siitä meille.
    to: https://github.com/Catventurist/kiintea/issues
    target: _blank
    icon: i-lucide-bug
    id: issues
  - title: Keskustele
    description: Kysya vinkkejä ja ehdota ideoita.
    to: https://t.me/harhaa
    target: _blank
    icon: i-social-telegram
    id: discuss
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
  - label: Voinko osallistua, vaikka en ole kokenut kehittäjä?
    content: Kyllä! Käännökset, kirjoitusvirheiden korjaukset ja esimerkit ovat yhtä tärkeitä kuin koodi.
    value: contribute
  - label: Voinko käyttää komponentteja omissa projekteissani?
    content: Kyllä, komponentit ovat avoimia. Kopioi ne projektiisi ja muokkaa tarpeen mukaan.
    value: license
---
::
:::
