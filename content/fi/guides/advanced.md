---
title: Kehittyneet työkalut
description: Markdown-pohjaisia kehittyneitä työkaluja.
navigation:
  title: Kehittyneet työkalut
  icon: i-lucide-hammer
layout: dashboard
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Hieman raskaampia esimerkkejä.

## ChartList

Pylväskaavio, jonka rivejä voi järjestää vetämällä tai lajitella painikkeilla. Järjestys säilytetään `useState`-tilassa, joten se nollautuu sivun uudelleenlatauksessa.

:::code-preview
::chart-list
---
state-key: preview-fi
type: bar
data:
  - { month: january, desktop: 186, mobile: 80 }
  - { month: february, desktop: 305, mobile: 200 }
  - { month: march, desktop: 237, mobile: 120 }
---
::

#code
```mdc
::chart-list
---
type: bar
data:
  - { month: january, desktop: 186, mobile: 80 }
  - { month: february, desktop: 305, mobile: 200 }
---
::
```
:::

## Playground

Muokattava MDC-esimerkki. Lukija muuttaa lähdettä ja näkee oikeiden komponenttien renderöityvän vieressä. Esikatselu päivittyy lyhyen tauon jälkeen. Syntaksivirhe näyttää viestin ja säilyttää viimeisen toimivan esikatselun.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::playground
---
title: Kokeile komponentteja
rows: 6
state-key: docs-preview-fi
examples:
  - label: Termi
    description: Tekstin seassa oleva sanastotermi ponnahdusikkunalla
    source: |
      Nuxt renderöi sivut oletuksena :term[SSR]{name="ssr"}-tekniikalla.
  - label: Termi ja työkaluvihje
    description: Yksittäinen termi, jolle ei ole sanastoselitettä
    source: |
      Nuxt tekee sivuista interaktiivisia :term[hydraatiolla]{text="Palvelimella renderöidyn HTML:n tekeminen interaktiiviseksi selaimessa."}.
---
::::
:::
:::tabs-item{label="Koodi" icon="i-lucide-code"}
```mdc
::::playground
---
title: Kokeile komponentteja
rows: 8
examples:
  - label: Termi
    source: |
      Nuxt renderöi sivut oletuksena :term[SSR]{name="ssr"}-tekniikalla.
  - label: Hero-lista
    source: |
      ::hero-list
      ---
      title: Leikkikenttä
      ---
      ::
---
::::
```
:::
::

**Propsit**

- `title`: otsikko työkalupalkissa.
- `source`: yksi alkuteksti. Käytä sitä, kun esimerkkejä on vain yksi.
- `examples`: lista, jossa `label`, `source` ja valinnainen `description`. Kahdella tai useammalla esimerkillä näkyy valikko. Yli kuudella valikossa on myös hakukenttä.
- `rows`: muokkausikkunan korkeus riveinä. Oletus on `12`.
- `stateKey`: avain, jolla teksti säilytetään `useState`-tilassa. Oletus on `default`. Anna jokaiselle sivun leikkikentälle oma avain, muuten ne jakavat tekstin.

**Hyvä tietää**

- Leikkikenttä voi renderöidä minkä tahansa `components/content/`-kansion komponentin paitsi itsensä.
- Kun lähde sisältää `::`-lohkoja, käytä ulommassa komponentissa neljää kaksoispistettä, kuten Koodi-välilehdellä.
- Toisen esimerkin valinta korvaa nykyisen tekstin. Palauta-painike palauttaa ensimmäisen esimerkin.
- Teksti säilyy `useState`-tilassa, joten se säilyy sivunvaihdossa mutta ei koko sivun uudelleenlatauksessa.
- Esikatselu renderöidään vain selaimessa. Palvelimella luodussa HTML:ssä se on tyhjä.

## SkillFinder

Selvitä, kuka yhteisössä voi auttaa missäkin. Lukija valitsee taidon ja näkee jäsenet tason mukaan järjestettynä, sekä heidän kokemuksensa, oppimistavoitteensa ja projektinsa. Kortit aukeavat tarkempia tietoja varten. `sortable`-propilla kortin taitoja ja oppimistavoitteita voi järjestää vetämällä. Järjestys nollautuu, kun sivu ladataan kokonaan uudelleen.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::skill-finder
---
sortable: true
members:
  - name: cat
    to: /guides/team/cat
    role: Ylläpitäjä
    since: 2021
    availability: Arki-iltaisin
    openToHelp: true
    skills:
      - name: Nuxt
        level: 4
        years: 3
        note: Moduulit ja SSR
      - name: Vue
        level: 4
        years: 5
    learning:
      - name: Testaus
        progress: 40
        goal: Kirjoittaa e2e-testit omille moduuleilleni
    projects:
      - title: nuxt-extras
        to: https://github.com/example/nuxt-extras
  - name: dog
    role: Avustaja
    since: 2023
    availability: Viikonloppuisin
    openToHelp: false
    skills:
      - name: Testaus
        level: 3
        years: 2
    learning:
      - name: Nuxt
        progress: 70
---
::::
:::
:::tabs-item{label="Koodi" icon="i-lucide-code"}
```mdc
::skill-finder
---
sortable: true
minLevel: 3
members:
  - name: cat
    role: Ylläpitäjä
    since: 2021
    openToHelp: true
    skills:
      - name: Nuxt
        level: 4
        years: 3
    learning:
      - name: Testaus
        progress: 40
---
::
```
:::
::

Propsit: `members`, `sortable` (oletus `false`), `minLevel` (oletus `3`), `avatar` (oletus `/catlight.webp`), `avatarDark` (oletus `/catdark.webp`).

**Jäsenen kentät:** `name`, `to`, `role`, `since`, `availability`, `openToHelp`, `skills`, `learning`, `projects`.

**Taidon kentät:** `name`, `level` (1-4), `years`, `note`.

**Oppimisen kentät:** `name`, `progress` (0-100), `goal`.

## Troubleshooting

Haettava lista ongelmista, joista kullekin on syy ja korjaus. Lukija voi kirjoittaa osan virheilmoituksesta, suodattaa tunnisteella ja avata yhden merkinnän kerrallaan tai kaikki.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::troubleshooting
---
group: tools-demo
title: Yleisiä ongelmia
items:
  - id: prose-not-styled
    problem: Prose-komponenteilla ei ole tyylejä
    severity: warning
    tags: [content, config]
    cause: 'Moduuli @nuxt/content on rekisteröity ennen moduulia @nuxt/ui, joten prose-komponentit eivät ole käytettävissä.'
    fix: 'Rekisteröi @nuxt/content moduulin @nuxt/ui jälkeen modules-taulukossa.'
    code:
      lang: ts
      file: nuxt.config.ts
      content: |
        export default defineNuxtConfig({
          modules: [
            '@nuxt/ui',
            '@nuxt/content'
          ]
        })
  - id: links-not-prefixed
    problem: Linkeille ei lisätä kielitunnusta
    severity: info
    since: '4.7+'
    tags: [i18n]
    cause: 'Moduulia @nuxtjs/i18n ei ole asennettu, tai linkki on ulkoinen.'
    fix: 'Asenna @nuxtjs/i18n. ULink- ja UButton-komponenttien sisäiset linkit lokalisoidaan automaattisesti.'
---
::::
:::
:::tabs-item{label="Koodi" icon="i-lucide-code"}
```mdc
::troubleshooting
---
group: setup
title: Yleisiä ongelmia
searchable: true
items:
  - id: links-not-prefixed
    problem: Linkeille ei lisätä kielitunnusta
    severity: info
    since: '4.7+'
    tags: [i18n]
    cause: 'Moduulia @nuxtjs/i18n ei ole asennettu.'
    fix: 'Asenna @nuxtjs/i18n.'
    links:
      - label: i18n-integraatio
        to: https://ui.nuxt.com/docs/getting-started/integrations/i18n
---
::
```
:::
::

Propsit: `items` (pakollinen, ongelmalista), `title` (valinnainen), `group` (valinnainen, oletus `default`) ja `searchable` (valinnainen, oletus `true`).

Jokaisella merkinnällä on `id`, `problem`, `cause` ja `fix` (kaikki pakollisia) sekä valinnaisesti `severity` (`error`, `warning` tai `info`, oletus `info`), `tags` (lista), `since` (versiomerkkijono, lainausmerkeissä), `code` (`content` sekä valinnaiset `lang` ja `file`) ja `links` (lista, jossa `label` ja `to`).

Inline-attribuutit asettavat vain yksinkertaiset propsit. Itse lista on annettava YAML-lohkossa.

Anna jokaiselle samalla sivulla olevalle listalle oma `group`, jotta niiden hakukentät pysyvät erillään. Merkintään voi linkittää suoraan `id`-arvolla, esimerkiksi `#prose-not-styled` ja sivu avaa kyseisen merkinnän latautuessaan. Käytä samaa `id`-arvoa molemmilla kielillä, jotta linkit toimivat kielenvaihdon jälkeen.

Jos haluat täyttää listan sisältötiedostoista, katso [Vianmäärityksen lähde](/guides/query#vianmäärityksen-lähde).

