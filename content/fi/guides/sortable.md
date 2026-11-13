---
title: Lajiteltavat listat
description: Vedettävät komponentit, joita voi käyttää Markdownissa.
navigation:
  title: Lajiteltavat
  icon: i-lucide-list-start
layout: dashboard
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Jokaista alla olevaa komponenttia voi käyttää kahdella tavalla: **YAML**-lohkolla tai **rivinsisäisillä propseilla** avausrivillä. Muuta listan järjestystä vetämällä kohteita.

## AccordionList

`UAccordion`, jonka paneelien järjestystä voi muuttaa tarttumakahvasta vetämällä.

**Kentät**
- `items[].label` (merkkijono): paneelin otsikko.
- `items[].content` (merkkijono): paneelin sisältö.
- `items[].value` (merkkijono, valinnainen): pysyvä tunniste. Aseta se, jotta avoin paneeli pysyy oman kohteensa mukana.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::accordion-list
---
items:
  - label: Aloitus
    content: Asenna moduuli ja lisää se asetuksiin.
    value: start
  - label: Teemoitus
    content: Muokkaa värejä, pyöristystä ja fontteja.
    value: theming
  - label: Julkaisu
    content: Rakenna ja julkaise sovelluksesi.
    value: deploy
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::accordion-list
---
items:
  - label: Aloitus
    content: Asenna moduuli ja lisää se asetuksiin.
    value: start
  - label: Teemoitus
    content: Muokkaa värejä, pyöristystä ja fontteja.
    value: theming
  - label: Julkaisu
    content: Rakenna ja julkaise sovelluksesi.
    value: deploy
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::accordion-list{:items='[{"label":"Aloitus","content":"Asenna moduuli ja lisää se asetuksiin.","value":"start"},{"label":"Teemoitus","content":"Muokkaa värejä, pyöristystä ja fontteja.","value":"theming"},{"label":"Julkaisu","content":"Rakenna ja julkaise sovelluksesi.","value":"deploy"}]'}
::
```
:::

::

## BoardList

Sarakkeista koostuva taulu, jossa on `UCard`-kortteja. Kortteja voi järjestää uudelleen sarakkeen sisällä ja vetää sarakkeesta toiseen, myös tyhjiin sarakkeisiin.

**Kentät**
- `columns[].id` (merkkijono): sarakkeen yksilöllinen tunniste.
- `columns[].title` (merkkijono): sarakkeen otsikko. Merkki näyttää sarakkeen korttien määrän.
- `columns[].cards` (taulukko, valinnainen): sarakkeen kortit. Jätä pois tai käytä arvoa `[]`, jos sarake on tyhjä.
- `columns[].cards[].id` (merkkijono): kortin tunniste. Sen on oltava yksilöllinen kaikissa sarakkeissa.
- `columns[].cards[].title` (merkkijono): kortin otsikko.
- `columns[].cards[].description` (merkkijono, valinnainen): otsikon alla oleva teksti.
- `columns[].cards[].icon` (merkkijono, valinnainen): Iconify-nimi, joka näytetään otsikon vieressä.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::board-list
---
columns:
  - id: todo
    title: Tehtävät
    cards:
      - id: layout
        title: Suunnittele asettelu
        description: Rautalankamallit ja komponenttivalinnat.
        icon: i-lucide-pen-tool
      - id: pages
        title: Rakenna sivut
        icon: i-lucide-hammer
  - id: doing
    title: Työn alla
    cards:
      - id: theme
        title: Määritä teema
        description: Värit, pyöristys ja fontit.
        icon: i-lucide-palette
  - id: done
    title: Valmis
    cards: []
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::board-list
---
columns:
  - id: todo
    title: Tehtävät
    cards:
      - id: layout
        title: Suunnittele asettelu
        description: Rautalankamallit ja komponenttivalinnat.
        icon: i-lucide-pen-tool
      - id: pages
        title: Rakenna sivut
        icon: i-lucide-hammer
  - id: doing
    title: Työn alla
    cards:
      - id: theme
        title: Määritä teema
        description: Värit, pyöristys ja fontit.
        icon: i-lucide-palette
  - id: done
    title: Valmis
    cards: []
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::board-list{:columns='[{"id":"todo","title":"Tehtävät","cards":[{"id":"layout","title":"Suunnittele asettelu","description":"Rautalankamallit ja komponenttivalinnat.","icon":"i-lucide-pen-tool"},{"id":"pages","title":"Rakenna sivut","icon":"i-lucide-hammer"}]},{"id":"doing","title":"Työn alla","cards":[{"id":"theme","title":"Määritä teema","description":"Värit, pyöristys ja fontit.","icon":"i-lucide-palette"}]},{"id":"done","title":"Valmis","cards":[]}]'}
::
```
:::

::

## CardList

Pino `UCard`-kortteja. Kortin kuvake toimii vetokahvana.

**Kentät**
- `items[].title` (merkkijono): kortin otsikko.
- `items[].description` (merkkijono, valinnainen): otsikon alla oleva teksti.
- `items[].icon` (merkkijono, valinnainen): Iconify-nimi, jota käytetään kahvana.
- `items[].id` (merkkijono, valinnainen): pysyvä tunniste.
- `handle-icon` (merkkijono, valinnainen): kuvake, jota käytetään, kun kohteella ei ole omaa kuvaketta. Oletus on `i-lucide-grip-vertical`.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::card-list
---
items:
  - title: Suunnittele asettelu
    description: Rautalankamallit ja komponenttivalinnat.
    icon: i-lucide-pen-tool
    id: design
  - title: Rakenna sivut
    description: Käytä Nuxt UI -komponentteja.
    icon: i-lucide-hammer
    id: build
  - title: Julkaise
    icon: i-lucide-rocket
    id: ship
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::card-list
---
items:
  - title: Suunnittele asettelu
    description: Rautalankamallit ja komponenttivalinnat.
    icon: i-lucide-pen-tool
    id: design
  - title: Rakenna sivut
    description: Käytä Nuxt UI -komponentteja.
    icon: i-lucide-hammer
    id: build
  - title: Julkaise
    icon: i-lucide-rocket
    id: ship
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::card-list{:items='[{"title":"Suunnittele asettelu","description":"Rautalankamallit ja komponenttivalinnat.","icon":"i-lucide-pen-tool","id":"design"},{"title":"Rakenna sivut","description":"Käytä Nuxt UI -komponentteja.","icon":"i-lucide-hammer","id":"build"},{"title":"Julkaise","icon":"i-lucide-rocket","id":"ship"}]'}
::
```
:::

::

## CheckboxList

`UCheckboxGroup`, jonka kohteiden järjestystä voi muuttaa vetämällä.

**Kentät**
- `legend` (merkkijono, valinnainen): ryhmän yläpuolella näkyvä otsikko.
- `items` (merkkijono[]): yksi valintaruutu kutakin alkiota kohden.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::checkbox-list
---
legend: Tehtävät
items:
  - Suunnittele
  - Rakenna
  - Julkaise
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::checkbox-list
---
legend: Tehtävät
items:
  - Suunnittele
  - Rakenna
  - Julkaise
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::checkbox-list{legend="Tehtävät" :items='["Suunnittele","Rakenna","Julkaise"]'}
::
```
:::

::

## CircleProgress

Ympyränmuotoinen edistymisilmaisin. Kun `interactive` on päällä, käyttäjä voi muuttaa arvoa.

**Kentät**
- `modelValue` (number, valinnainen): nykyinen arvo. Oletus on `0`.
- `variant` (string, valinnainen): ulkoasu. Käytä arvoa `circular`.
- `interactive` (boolean, valinnainen): sallii arvon muuttamisen käyttäjältä. Oletus on `false`.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::circle-progress
---
modelValue: 67
variant: circular
interactive: true
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::circle-progress
---
modelValue: 67
variant: circular
interactive: true
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::circle-progress{:model-value="67" variant="circular" interactive}
::
```
:::

::

## NavList

Tasainen `UNavigationMenu`, jonka linkkien järjestystä voi muuttaa vetämällä. Sisäkkäisiä `children`-kohteita ei tueta.

**Kentät**
- `items[].label` (merkkijono): linkin teksti.
- `items[].icon` (merkkijono, valinnainen): Iconify-nimi.
- `items[].to` (merkkijono, valinnainen): linkin kohde. Linkin napsauttaminen siirtyy edelleen kohteeseen.
- `items[].badge` (merkkijono | numero, valinnainen): linkin lopussa näkyvä merkki.
- `orientation` (`vertical` | `horizontal`, valinnainen): valikon asettelu. Oletus on `vertical`.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::nav-list
---
orientation: vertical
items:
  - label: Komponentit
    icon: i-lucide-box
    to: https://ui.nuxt.com/docs/components
  - label: Typografia
    icon: i-lucide-type
    to: https://ui.nuxt.com/docs/typography
  - label: Teemoitus
    icon: i-lucide-palette
    to: https://ui.nuxt.com/docs/getting-started/theme
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::nav-list
---
orientation: vertical
items:
  - label: Komponentit
    icon: i-lucide-box
    to: https://ui.nuxt.com/docs/components
  - label: Typografia
    icon: i-lucide-type
    to: https://ui.nuxt.com/docs/typography
  - label: Teemoitus
    icon: i-lucide-palette
    to: https://ui.nuxt.com/docs/getting-started/theme
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::nav-list{orientation="vertical" :items='[{"label":"Komponentit","icon":"i-lucide-box","to":"https://ui.nuxt.com/docs/components"},{"label":"Typografia","icon":"i-lucide-type","to":"https://ui.nuxt.com/docs/typography"},{"label":"Teemoitus","icon":"i-lucide-palette","to":"https://ui.nuxt.com/docs/getting-started/theme"}]'}
::
```
:::

::

## RadioList

`URadioGroup`, jonka kohteita voi vetää. Valittu arvo pysyy kohteen mukana.

**Kentät**
- `legend` (merkkijono, valinnainen): ryhmän yläpuolella näkyvä otsikko.
- `items` (merkkijono[]): yksi valintapainike kutakin alkiota kohden. Ensimmäinen on oletuksena valittu.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::radio-list
---
legend: Tärkeys
items:
  - Matala
  - Tavallinen
  - Korkea
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::radio-list
---
legend: Tärkeys
items:
  - Matala
  - Tavallinen
  - Korkea
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::radio-list{legend="Tärkeys" :items='["Matala","Tavallinen","Korkea"]'}
::
```
:::

::

## StepperList

`UStepper`, jonka vaiheiden järjestystä voi muuttaa. Eteneminen seuraa vaiheen paikkaa, ei itse vaihetta.

**Kentät**
- `items[].title` (merkkijono): vaiheen otsikko.
- `items[].description` (merkkijono, valinnainen): otsikon alla oleva teksti.
- `items[].icon` (merkkijono, valinnainen): Iconify-nimi.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::stepper-list
---
items:
  - title: Osoite
    description: Mihin toimitamme tilauksen?
    icon: i-lucide-map-pin
  - title: Toimitus
    description: Valitse toimitustapa.
    icon: i-lucide-truck
  - title: Kassa
    description: Tarkista ja maksa.
    icon: i-lucide-credit-card
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::stepper-list
---
items:
  - title: Osoite
    description: Mihin toimitamme tilauksen?
    icon: i-lucide-map-pin
  - title: Toimitus
    description: Valitse toimitustapa.
    icon: i-lucide-truck
  - title: Kassa
    description: Tarkista ja maksa.
    icon: i-lucide-credit-card
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::stepper-list{:items='[{"title":"Osoite","description":"Mihin toimitamme tilauksen?","icon":"i-lucide-map-pin"},{"title":"Toimitus","description":"Valitse toimitustapa.","icon":"i-lucide-truck"},{"title":"Kassa","description":"Tarkista ja maksa.","icon":"i-lucide-credit-card"}]'}
::
```
:::

::

## SwatchList

Väripaletti, jonka värinäytteiden järjestystä voi muuttaa vetämällä. Värinäytettä napsauttamalla voi myös asettaa sivuston pääväriksi. Värit tulevat `--swatch-*`-CSS-muuttujista ja jos muuttujaa ei ole, käytetään teeman `500`-sävyä.

**Kentät**
- `colors` (merkkijono[], valinnainen): värien nimet näyttöjärjestyksessä. Oletuksena blue, sky, indigo, violet, green, emerald, amber, orange ja rose.
- `select` (totuusarvo, valinnainen): kun arvo on `true`, värinäytteen napsauttaminen asettaa arvon `ui.colors.primary`. Oletus on `true`.
- `compact` (totuusarvo, valinnainen): piilottaa nimet ja käyttää pienempiä värinäytteitä. Oletus on `false`.

Värien on oltava teemassasi. Käytä Tailwindin oletusvärejä tai määritä oman värin sävyt 50-950 ensin.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::swatch-list
---
select: true
colors:
  - blue
  - sky
  - indigo
  - violet
  - green
  - emerald
  - amber
  - orange
  - rose
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::swatch-list
---
select: true
colors:
  - blue
  - sky
  - indigo
  - violet
  - green
  - emerald
  - amber
  - orange
  - rose
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::swatch-list{:colors='["blue","sky","indigo","violet","green","emerald","amber","orange","rose"]'}
::
```
:::

::

**Kompakti**

Lisää `compact`, jos haluat pienen version ilman nimiä, joka mahtuu pieneen tilaan.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::swatch-list{compact}
::
:::

:::tabs-item{label="Koodi" icon="i-lucide-code"}
```mdc
::swatch-list{compact}
::
```
:::

::

## TableList

`UTable`, jossa on vetosarake. Kunkin rivin kahvana voi olla avatar, kuvake tai oletuksena tarttumakuvake. Lajittelua, suodatusta ja sivutusta ei tueta, koska ne rikkovat vastaavuuden näytettyjen rivien ja datan välillä.

**Kentät**
- `columns[].key` (merkkijono): rivin kenttä, joka näytetään.
- `columns[].label` (merkkijono): sarakkeen otsikko.
- `data[].id` (merkkijono | numero): rivin yksilöllinen tunniste.
- `data[].avatar` (merkkijono, valinnainen): kuvan URL, jota käytetään kahvana.
- `data[].icon` (merkkijono, valinnainen): Iconify-nimi, jota käytetään, jos avataria ei ole.
- Muut rivin kentät ovat sarakkeiden käytettävissä niiden `key`-arvon kautta.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::table-list
---
columns:
  - key: name
    label: Nimi
  - key: role
    label: Rooli
data:
  - id: 1
    name: Ada Lovelace
    role: Insinööri
    avatar: /catdark.webp
  - id: 2
    name: Grace Hopper
    role: Amiraali
    icon: i-lucide-anchor
  - id: 3
    name: Alan Turing
    role: Matemaatikko
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::table-list
---
columns:
  - key: name
    label: Nimi
  - key: role
    label: Rooli
data:
  - id: 1
    name: Ada Lovelace
    role: Insinööri
    avatar: /catdark.webp
  - id: 2
    name: Grace Hopper
    role: Amiraali
    icon: i-lucide-anchor
  - id: 3
    name: Alan Turing
    role: Matemaatikko
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::table-list{:columns='[{"key":"name","label":"Nimi"},{"key":"role","label":"Rooli"}]' :data='[{"id":1,"name":"Ada Lovelace","role":"Insinööri","avatar":"/catdark.webp"},{"id":2,"name":"Grace Hopper","role":"Amiraali","icon":"i-lucide-anchor"},{"id":3,"name":"Alan Turing","role":"Matemaatikko"}]'}
::
```
:::

::

## TabsList

`UTabs`, jossa järjestystä muutetaan vetämällä itse välilehtiä.

**Kentät**
- `items[].label` (merkkijono): välilehden otsikko.
- `items[].content` (merkkijono): aktiivisen välilehden sisältö.
- `items[].icon` (merkkijono, valinnainen): Iconify-nimi.
- `items[].value` (merkkijono, valinnainen): pysyvä tunniste. Aseta se, jotta aktiivinen välilehti pysyy oman kohteensa mukana.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::tabs-list
---
items:
  - label: Tili
    icon: i-lucide-user
    content: Hallitse tilisi asetuksia.
    value: account
  - label: Laskutus
    icon: i-lucide-credit-card
    content: Laskut ja maksutavat.
    value: billing
  - label: Tiimi
    icon: i-lucide-users
    content: Kutsu ja hallitse jäseniä.
    value: team
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::tabs-list
---
items:
  - label: Tili
    icon: i-lucide-user
    content: Hallitse tilisi asetuksia.
    value: account
  - label: Laskutus
    icon: i-lucide-credit-card
    content: Laskut ja maksutavat.
    value: billing
  - label: Tiimi
    icon: i-lucide-users
    content: Kutsu ja hallitse jäseniä.
    value: team
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::tabs-list{:items='[{"label":"Tili","icon":"i-lucide-user","content":"Hallitse tilisi asetuksia.","value":"account"},{"label":"Laskutus","icon":"i-lucide-credit-card","content":"Laskut ja maksutavat.","value":"billing"},{"label":"Tiimi","icon":"i-lucide-users","content":"Kutsu ja hallitse jäseniä.","value":"team"}]'}
::
```
:::

::

## TagsList

`UInputTags`, jonka tunnisteiden järjestystä voi muuttaa vetämällä. Tunnisteita voi edelleen lisätä ja poistaa.

**Kentät**
- `items` (merkkijono[], valinnainen): alkuperäiset tunnisteet.
- `placeholder` (merkkijono, valinnainen): teksti, joka näkyy, kun kenttä on tyhjä.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::tags-list
---
placeholder: Lisää tunniste...
items:
  - Suunnittelu
  - Rakennus
  - Julkaisu
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::tags-list
---
placeholder: Lisää tunniste...
items:
  - Suunnittelu
  - Rakennus
  - Julkaisu
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::tags-list{placeholder="Lisää tunniste..." :items='["Suunnittelu","Rakennus","Julkaisu"]'}
::
```
:::

::

## TimelineList

`UTimeline`, jonka merkintöjen järjestystä voi muuttaa. Kuvake tai avatar toimii vetokahvana. Eteneminen seuraa merkinnän paikkaa, ei itse merkintää.

**Kentät**
- `items[].title` (merkkijono): merkinnän otsikko.
- `items[].description` (merkkijono, valinnainen): otsikon alla oleva teksti.
- `items[].date` (merkkijono, valinnainen): otsikon yläpuolella näkyvä päivämäärä.
- `items[].icon` (merkkijono, valinnainen): Iconify-nimi, jota käytetään kahvana.
- `items[].avatar` (objekti, valinnainen): `src` ja valinnainen `alt`. Käytetään kahvana kuvakkeen sijaan.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::timeline-list
---
items:
  - date: 15.3.2026
    title: Projektin aloitus
    description: Laajuus ja tavoitteet sovittu.
    icon: i-lucide-rocket
  - date: 22.3.2026
    title: Ensimmäinen prototyyppi
    description: Ydinkulku valmis tarkistettavaksi.
    icon: i-lucide-pen-tool
  - date: 2.4.2026
    title: Julkaisu
    description: Julkaistu tuotantoon.
    avatar:
      src: /catdark.webp
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::timeline-list
---
items:
  - date: 15.3.2026
    title: Projektin aloitus
    description: Laajuus ja tavoitteet sovittu.
    icon: i-lucide-rocket
  - date: 22.3.2026
    title: Ensimmäinen prototyyppi
    description: Ydinkulku valmis tarkistettavaksi.
    icon: i-lucide-pen-tool
  - date: 2.4.2026
    title: Julkaisu
    description: Julkaistu tuotantoon.
    avatar:
      src: /catdark.webp
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::timeline-list{:items='[{"date":"15.3.2026","title":"Projektin aloitus","description":"Laajuus ja tavoitteet sovittu.","icon":"i-lucide-rocket"},{"date":"22.3.2026","title":"Ensimmäinen prototyyppi","description":"Ydinkulku valmis tarkistettavaksi.","icon":"i-lucide-pen-tool"},{"date":"2.4.2026","title":"Julkaisu","description":"Julkaistu tuotantoon.","avatar":{"src":"/catdark.webp"}}]'}
::
```
:::

::
