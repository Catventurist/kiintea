---
title: Järjesteltävät listat
description: Vedä ja pudota -komponentteja, joita voi käyttää Markdownista.
navigation:
  title: Järjesteltävät
  icon: i-lucide-list-start
layout: dashboard
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Nuxt UI:hin perustuvia komponentteja, joiden kohteiden järjestystä voi muuttaa vetämällä. Kirjoita tiedot **YAML**-lohkona, kuten alla olevissa esimerkeissä. Lyhyille arvoille voi käyttää myös inline-propseja, katso [Propsien antaminen inline-muodossa](/guides/tools#propsien-antaminen-inline-muodossa).

## Yleiskatsaus

| Komponentti | Kääree | Mitä vedetään |
| --- | --- | --- |
| `accordion-list` | `UAccordion` | Paneelit, tarttumakahvasta |
| `board-list` | `UCard` | Kortit, sarakkeen sisällä ja sarakkeiden välillä |
| `card-list` | `UCard` | Kortit, kortin kuvakkeesta |
| `checkbox-list` | `UCheckboxGroup` | Valintaruudut |
| `circle-progress` | Ympyräedistymä | Arvo, kun `interactive` on päällä |
| `nav-list` | `UNavigationMenu` | Linkit |
| `radio-list` | `URadioGroup` | Valintapainikkeet |
| `stepper-list` | `UStepper` | Vaiheet |
| `swatch-list` | Värinäytteet | Näytteet |
| `table-list` | `UTable` | Rivit, vetosarakkeesta |
| `tabs-list` | `UTabs` | Välilehdet |
| `tags-list` | `UInputTags` | Tunnisteet |
| `timeline-list` | `UTimeline` | Merkinnät, kuvakkeesta tai avatarista |

## AccordionList

`UAccordion`, jonka paneeleita voi järjestää tarttumakahvalla.

**Kentät**
- `items[].label` (merkkijono): paneelin otsikko.
- `items[].content` (merkkijono): paneelin sisältö.
- `items[].value` (merkkijono, valinnainen): vakaa tunniste. Aseta se, jotta avoin paneeli seuraa kohdettaan.

:::code-preview
::accordion-list
---
items:
  - label: Aloittaminen
    content: Asenna moduuli ja lisää se asetuksiin.
    value: start
  - label: Teemoitus
    content: Mukauta värejä, pyöristyksiä ja fontteja.
    value: theming
  - label: Julkaiseminen
    content: Rakenna ja julkaise sovelluksesi.
    value: deploy
---
::

#code
```mdc
::accordion-list
---
items:
  - label: Aloittaminen
    content: Asenna moduuli ja lisää se asetuksiin.
    value: start
  - label: Teemoitus
    content: Mukauta värejä, pyöristyksiä ja fontteja.
    value: theming
---
::
```
:::

## BoardList

Taulu, jossa on sarakkeita ja `UCard`-kortteja. Kortteja voi järjestää sarakkeen sisällä ja vetää sarakkeiden välillä, myös tyhjiin sarakkeisiin.

**Kentät**
- `columns[].id` (merkkijono): sarakkeen yksilöllinen tunniste.
- `columns[].title` (merkkijono): sarakkeen otsikko. Merkki näyttää sen korttien määrän.
- `columns[].cards` (taulukko, valinnainen): sarakkeen kortit. Jätä pois tai käytä `[]` tyhjälle sarakkeelle.
- `columns[].cards[].id` (merkkijono): kortin tunniste. Sen on oltava yksilöllinen kaikissa sarakkeissa.
- `columns[].cards[].title` (merkkijono): kortin otsikko.
- `columns[].cards[].description` (merkkijono, valinnainen): otsikon alla oleva teksti.
- `columns[].cards[].icon` (merkkijono, valinnainen): Iconify-nimi, joka näytetään otsikon vieressä.

:::code-preview
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
        description: Värit, pyöristykset ja fontit.
        icon: i-lucide-palette
  - id: done
    title: Valmis
    cards: []
---
::

#code
```mdc
::board-list
---
columns:
  - id: todo
    title: Tehtävät
    cards:
      - id: layout
        title: Suunnittele asettelu
        icon: i-lucide-pen-tool
  - id: done
    title: Valmis
    cards: []
---
::
```
:::

## CardList

Pino `UCard`-kortteja. Kortin kuvake toimii vetokahvana.

**Kentät**
- `items[].title` (merkkijono): kortin otsikko.
- `items[].description` (merkkijono, valinnainen): otsikon alla oleva teksti.
- `items[].icon` (merkkijono, valinnainen): Iconify-nimi, jota käytetään kahvana.
- `items[].id` (merkkijono, valinnainen): vakaa tunniste.
- `handle-icon` (merkkijono, valinnainen): kuvake, jota käytetään, kun kohteella ei ole omaa. Oletus on `i-lucide-grip-vertical`.

:::code-preview
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

#code
```mdc
::card-list
---
items:
  - title: Suunnittele asettelu
    icon: i-lucide-pen-tool
    id: design
  - title: Julkaise
    id: ship
---
::
```
:::

## CheckboxList

`UCheckboxGroup`, jossa kohteita voi järjestää vetämällä.

**Kentät**
- `legend` (merkkijono, valinnainen): ryhmän yläpuolella näkyvä otsikko.
- `items` (merkkijono[]): yksi valintaruutu kutakin kohdetta kohden.

:::code-preview
::checkbox-list
---
legend: Tehtävät
items:
  - Suunnittele
  - Rakenna
  - Julkaise
---
::

#code
```mdc
::checkbox-list{legend="Tehtävät" :items='["Suunnittele","Rakenna","Julkaise"]'}
::
```
:::

## CircleProgress

Ympyränmuotoinen edistymisen ilmaisin. Kun `interactive` on asetettu, käyttäjä voi muuttaa arvoa.

**Kentät**
- `modelValue` (luku, valinnainen): nykyinen arvo. Oletus on `0`. Inline-muodossa kirjoita `:model-value`.
- `variant` (merkkijono, valinnainen): ulkoasu. Käytä arvoa `circular`.
- `interactive` (totuusarvo, valinnainen): sallii käyttäjän muuttaa arvoa. Oletus on `false`.

:::code-preview
::circle-progress
---
modelValue: 67
variant: circular
interactive: true
---
::

#code
```mdc
::circle-progress{:model-value="67" variant="circular" interactive}
::
```
:::

## NavList

Tasainen `UNavigationMenu`, jonka linkkejä voi järjestää vetämällä. Sisäkkäisiä `children`-kohteita ei tueta.

**Kentät**
- `items[].label` (merkkijono): linkin teksti.
- `items[].icon` (merkkijono, valinnainen): Iconify-nimi.
- `items[].to` (merkkijono, valinnainen): linkin kohde. Linkin napsauttaminen siirtää silti sivulle.
- `items[].badge` (merkkijono | luku, valinnainen): linkin lopussa näkyvä merkki.
- `orientation` (`vertical` | `horizontal`, valinnainen): valikon asettelu. Oletus on `vertical`.

:::code-preview
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

#code
```mdc
::nav-list
---
orientation: vertical
items:
  - label: Komponentit
    icon: i-lucide-box
    to: https://ui.nuxt.com/docs/components
    badge: 60
  - label: Teemoitus
    icon: i-lucide-palette
    to: https://ui.nuxt.com/docs/getting-started/theme
---
::
```
:::

## RadioList

`URadioGroup`, jonka kohteita voi vetää. Valittu arvo pysyy kohteensa mukana.

**Kentät**
- `legend` (merkkijono, valinnainen): ryhmän yläpuolella näkyvä otsikko.
- `items` (merkkijono[]): yksi valintapainike kutakin kohdetta kohden. Ensimmäinen on oletuksena valittu.

:::code-preview
::radio-list
---
legend: Tärkeys
items:
  - Matala
  - Keskitaso
  - Korkea
---
::

#code
```mdc
::radio-list{legend="Tärkeys" :items='["Matala","Keskitaso","Korkea"]'}
::
```
:::

## StepperList

`UStepper`, jonka vaiheita voi järjestää. Eteneminen seuraa sijaintia, ei vaihetta.

**Kentät**
- `items[].title` (merkkijono): vaiheen otsikko.
- `items[].description` (merkkijono, valinnainen): otsikon alla oleva teksti.
- `items[].icon` (merkkijono, valinnainen): Iconify-nimi.

:::code-preview
::stepper-list
---
items:
  - title: Osoite
    description: Minne toimitamme sen?
    icon: i-lucide-map-pin
  - title: Toimitus
    description: Valitse tapa.
    icon: i-lucide-truck
  - title: Kassa
    description: Tarkista ja maksa.
    icon: i-lucide-credit-card
---
::

#code
```mdc
::stepper-list
---
items:
  - title: Osoite
    icon: i-lucide-map-pin
  - title: Kassa
    icon: i-lucide-credit-card
---
::
```
:::

## SwatchList

Värinäytteiden paletti, jonka järjestystä voi muuttaa vetämällä. Näytteen napsauttaminen voi myös asettaa sivuston pääväriksi. Värit tulevat `--swatch-*`-CSS-muuttujista ja jos niitä ei ole, käytetään teeman `500`-sävyä.

**Kentät**
- `colors` (merkkijono[], valinnainen): värien nimet näyttöjärjestyksessä. Oletuksena blue, sky, indigo, violet, green, emerald, amber, orange ja rose.
- `select` (totuusarvo, valinnainen): kun `true`, näytteen napsauttaminen asettaa arvon `ui.colors.primary`. Oletus on `true`.
- `compact` (totuusarvo, valinnainen): piilottaa nimet ja käyttää pienempiä näytteitä. Oletus on `false`.

Värien on oltava olemassa teemassasi. Käytä Tailwindin oletusvärejä tai määritä oman värin sävyt 50-950 ensin.

:::code-preview
::swatch-list
---
select: true
colors: [blue, sky, indigo, violet, green, emerald, amber, orange, rose]
---
::

#code
```mdc
::swatch-list
---
select: true
colors: [blue, indigo, green]
---
::
```
:::

**Kompakti**

Lisää `compact` saadaksesi pienen version ilman nimiä, joka mahtuu pieneen tilaan.

:::code-preview
::swatch-list{compact}
::

#code
```mdc
::swatch-list{compact}
::
```
:::

## TableList

`UTable`, jossa on vetosarake. Jokainen rivi voi näyttää kahvanaan avatarin, kuvakkeen tai oletuksena tarttumakahvan. Lajittelua, suodatusta ja sivutusta ei tueta, koska ne rikkovat näytettyjen rivien ja datan vastaavuuden.

**Kentät**
- `columns[].key` (merkkijono): näytettävä rivin kenttä.
- `columns[].label` (merkkijono): sarakkeen otsikko.
- `data[].id` (merkkijono | luku): rivin yksilöllinen tunniste.
- `data[].avatar` (merkkijono, valinnainen): kuvan URL, jota käytetään kahvana.
- `data[].icon` (merkkijono, valinnainen): Iconify-nimi, jota käytetään, kun avataria ei ole.
- Mikä tahansa muu rivin kenttä on sarakkeen käytettävissä sen `key`-arvolla.

:::code-preview
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

#code
```mdc
::table-list
---
columns:
  - key: name
    label: Nimi
data:
  - id: 1
    name: Ada Lovelace
    avatar: /catdark.webp
  - id: 2
    name: Grace Hopper
    icon: i-lucide-anchor
---
::
```
:::

## TabsList

`UTabs`, jossa välilehtiä itseään vedetään niiden järjestyksen muuttamiseksi.

**Kentät**
- `items[].label` (merkkijono): välilehden otsikko.
- `items[].content` (merkkijono): aktiivisen välilehden teksti.
- `items[].icon` (merkkijono, valinnainen): Iconify-nimi.
- `items[].value` (merkkijono, valinnainen): vakaa tunniste. Aseta se, jotta aktiivinen välilehti seuraa kohdettaan.

:::code-preview
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

#code
```mdc
::tabs-list
---
items:
  - label: Tili
    icon: i-lucide-user
    content: Hallitse tilisi asetuksia.
    value: account
  - label: Laskutus
    content: Laskut ja maksutavat.
    value: billing
---
::
```
:::

## TagsList

`UInputTags`, jonka tunnisteita voi järjestää vetämällä. Tunnisteita voi edelleen lisätä ja poistaa.

**Kentät**
- `items` (merkkijono[], valinnainen): alkutunnisteet.
- `placeholder` (merkkijono, valinnainen): teksti, joka näytetään kentän ollessa tyhjä.

:::code-preview
::tags-list
---
placeholder: Lisää tunniste...
items:
  - Suunnittele
  - Rakenna
  - Julkaise
---
::

#code
```mdc
::tags-list{placeholder="Lisää tunniste..." :items='["Suunnittele","Rakenna","Julkaise"]'}
::
```
:::

## TimelineList

`UTimeline`, jonka merkintöjä voi järjestää. Kuvake tai avatar toimii vetokahvana. Eteneminen seuraa sijaintia, ei merkintää.

**Kentät**
- `items[].title` (merkkijono): merkinnän otsikko.
- `items[].description` (merkkijono, valinnainen): otsikon alla oleva teksti.
- `items[].date` (merkkijono, valinnainen): otsikon yläpuolella näkyvä päivämäärä.
- `items[].icon` (merkkijono, valinnainen): Iconify-nimi, jota käytetään kahvana.
- `items[].avatar` (objekti, valinnainen): `src` ja valinnainen `alt`, joita käytetään kahvana kuvakkeen sijaan.

:::code-preview
::timeline-list
---
items:
  - date: 15.3.2026
    title: Projektin aloitus
    description: Laajuus ja tavoitteet sovittu.
    icon: i-lucide-rocket
  - date: 22.3.2026
    title: Ensimmäinen prototyyppi
    description: Pääkulku valmiina tarkistettavaksi.
    icon: i-lucide-pen-tool
  - date: 2.4.2026
    title: Julkaisu
    description: Vietiin tuotantoon.
    avatar:
      src: /catdark.webp
---
::

#code
```mdc
::timeline-list
---
items:
  - date: 15.3.2026
    title: Projektin aloitus
    icon: i-lucide-rocket
  - date: 2.4.2026
    title: Julkaisu
    avatar:
      src: /catdark.webp
---
::
```
:::
