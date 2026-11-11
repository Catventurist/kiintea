---
title: Tietoa
description: Mikä tämä sivusto on, millä se on tehty ja mihin kannattaa mennä seuraavaksi.
navigation:
  title: Tietoa
  icon: i-lucide-info
seo:
  title: Tietoa
  description: Mikä tämä sivusto on, millä se on tehty ja mihin kannattaa mennä seuraavaksi.
layout: default
sidebar: true
collapsed: false
splitter: false
toc: false
surround: true
---

:::u-page-section
---
title: Tietoa sivustosta
description: Kokoelma interaktiivisia MDC-komponentteja Nuxt 4:lle, Nuxt UI v4:lle ja Nuxt Contentille. Jokaista listaa voi järjestää vetämällä, ja kaikki toimii pelkällä Markdownilla.
---

::tabs-list
---
items:
  - label: Tarkoitus
    icon: i-lucide-target
    content: Tee dokumentaatiosta interaktiivisempaa poistumatta Markdownista.
    value: purpose
  - label: Teknologiat
    icon: i-lucide-layers
    content: Nuxt 4, Nuxt UI v4, Nuxt Content ja Tailwind CSS.
    value: stack
  - label: Osallistu
    icon: i-lucide-git-pull-request
    content: Ehdota komponenttia tai paranna olemassa olevaa.
    value: contribute
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Tehty näillä
description: Työkalut tämän sivuston takana.
---

::icon-list
---
items:
  - icon: i-social-finland
    label: Suomi
    to: /fi
  - icon: i-social-usa
    label: English
    to: /
  - icon: i-social-nuxt
    label: Nuxt
    to: https://nuxt.com
    target: _blank
  - icon: i-social-tailwind
    label: Tailwind CSS
    to: https://tailwindcss.com
    target: _blank
  - icon: i-social-typescript
    label: TypeScript
    to: https://www.typescriptlang.org
    target: _blank
  - icon: i-social-reka
    label: Reka UI
    to: https://reka-ui.com
    target: _blank
  - icon: i-social-motionvue
    label: Motion Vue
    to: https://motion-v.dev
    target: _blank
  - icon: i-social-zod
    label: Zod
    to: https://zod.dev
    target: _blank
  - icon: i-social-vercel
    label: Vercel
    to: https://vercel.com
    target: _blank
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Teknologiat lyhyesti
description: Teknologiat, joilla tämä sivusto on rakennettu.
---

::table-list
---
columns:
  - key: name
    label: Teknologia
  - key: purpose
    label: Käyttötarkoitus
data:
  - id: 1
    name: Nuxt 4
    purpose: Sovelluskehys
    icon: i-lucide-box
  - id: 2
    name: Nuxt UI v4
    purpose: Komponenttikirjasto
    icon: i-lucide-palette
  - id: 3
    name: Nuxt Content
    purpose: Markdown ja MDC
    icon: i-lucide-file-text
  - id: 4
    name: Tailwind CSS
    purpose: Tyylittely
    icon: i-lucide-wind
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
:::

:::u-page-section{class="mt-20"}
---
title: Aiheet
description: Lisää itseäsi kiinnostavat aiheet.
---

::tags-list
---
placeholder: Lisää aihe...
items:
  - Teemat
  - Lomakkeet
  - Asettelu
  - Sisältö
  - Vedä ja pudota
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Ennen kuin aloitat
description: Varmista, että nämä ovat valmiina.
---

::checkbox-list
---
legend: Tarkistuslista
items:
  - Node.js asennettuna
  - Nuxt 4 -projekti
  - Nuxt UI ja Nuxt Content lisättynä
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Mikä polku sopii sinulle?
description: Valitse, mitä haluat tehdä.
---

::radio-list
---
legend: Haluan
items:
  - Kokeilla komponentteja
  - Rakentaa dokumentaatiosivuston
  - Osallistua
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Tutustu
description: Siirry sivuston osiin, joita tarvitset.
---

::nav-list
---
orientation: vertical
items:
  - label: Aloitusopas
    icon: i-lucide-rocket
    to: /guides
  - label: Työkalut
    icon: i-lucide-wrench
    to: /guides/tools
  - label: Koti
    icon: i-lucide-house
    to: /
---
::
:::

:::u-page-section{class="mt-20"}
---
title: Valitse väri
description: Napsauta värinäytettä asettaaksesi sivuston pääväri.
---

::swatch-list{compact}
::
:::

:::u-page-section{class="mt-20"}
---
title: Löydä meidät
description: Missä yhteisö viettää aikaansa.
---

::icon-list
---
items:
  - icon: i-social-github
    label: GitHub
    to: https://github.com/Catventurist/kiintea
    target: _blank
  - icon: i-social-telegram
    label: Telegram
    to: https://t.me/harhaa
    target: _blank
  - icon: i-social-signal
    label: Signal
    to: https://signal.org
    target: _blank
  - icon: i-social-jitsi
    label: Jitsi
    to: https://meet.jit.si
    target: _blank
  - icon: i-social-ecency
    label: Ecency
    to: https://ecency.com
    target: _blank
---
::
:::
