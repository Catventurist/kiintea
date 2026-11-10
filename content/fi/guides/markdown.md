---
title: Markdown
description: Näin luot selkeää sisältöä Markdownilla.
navigation:
  title: Markdown
  icon: i-lucide-file-text
layout: dashboard
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Laajasti käytetty lausekemuoto monenlaiselle sisällölle.

::tip{to="/guides/sortable"}
Mukautetut vedettävät ja lajiteltavat elementit
::

### Otsikot

::code-preview
## Kiinteä

#code
```mdc
## Kiinteä
```
::

### Lihavointi
::code-preview
**Kiinteä**

#code
```mdc
**Kiinteä**
```
::

### Kursivointi

::code-preview{label="Esikatselu" class="[&>div]:*:my-0"}
*Kiinteä*

#code

```mdc
*Kiinteä*
```
::

## Linkit

Luo linkki kirjoittamalla linkin teksti hakasulkeisiin ja sen perään URL-osoite sulkeisiin. Toimii sekä ulkoisille että sisäisille linkeille.


::code-preview{label="Esikatselu" class="[&>div]:*:my-0"}
[Nuxt-dokumentaatio](https://nuxt.com)

#code

```mdc
[Nuxt-dokumentaatio](https://nuxt.com)
```
::

## Lainaukset

Käytä lainauksia tärkeiden tietojen tai sitaattien korostamiseen.

::code-preview{label="Esikatselu"}
> Kiinteä mukautuu automaattisesti teema-asetuksiisi ja varmistaa yhtenäisen typografian koko sovelluksessasi.

#code

```mdc
> Kiinteä mukautuu automaattisesti teema-asetuksiisi ja varmistaa yhtenäisen typografian koko sovelluksessasi.
```
::

## Listat

Markdown tukee numeroimattomia, numeroituja ja sisäkkäisiä listoja erilaisiin tarpeisiin.

### Numeroimattomat listat

Käytä numeroimattomia listoja kohteille, joilla ei ole kiinteää järjestystä. Aloita jokainen kohde `-`-merkillä.

::code-preview{label="Esikatselu" class="[&>div]:*:my-0 [&>div]:*:w-full"}

- Olen listan kohde.
- Olen toinen listan kohde.
- Olen listan viimeinen kohde.

#code

```mdc
- Olen listan kohde.
- Olen toinen listan kohde.
- Olen listan viimeinen kohde.
```
::

### Numeroidut listat

Käytä numeroituja listoja, kun järjestyksellä on merkitystä, esimerkiksi prosessin vaiheissa. Aloita jokainen kohde numerolla.

::code-preview{label="Esikatselu" class="[&>div]:*:my-0 [&>div]:*:w-full"}

1. Olen listan kohde.
2. Olen toinen listan kohde.
3. Olen listan viimeinen kohde.

#code

```mdc
1. Olen listan kohde.
2. Olen toinen listan kohde.
3. Olen listan viimeinen kohde.
```
::

### Sisäkkäiset listat

Luo hierarkkisia listoja alikohteilla monimutkaisia rakenteita varten. Sisennä alikohteet neljällä välilyönnillä.

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full"}

- Olen listan kohde.
  - Olen sisäkkäinen listan kohde.
  - Olen toinen sisäkkäinen listan kohde.
- Olen toinen listan kohde.
  - Toinen sisäkkäinen kohde
    - Syvälle sisäkkäinen kohde
    - Toinen syvälle sisäkkäinen kohde
  - Takaisin toiselle tasolle

#code

```mdc
- Olen listan kohde.
  - Olen sisäkkäinen listan kohde.
  - Olen toinen sisäkkäinen listan kohde.
- Olen toinen listan kohde.
  - Toinen sisäkkäinen kohde
    - Syvälle sisäkkäinen kohde
    - Toinen syvälle sisäkkäinen kohde
  - Takaisin toiselle tasolle
```

::

### Sekalistat

Voit yhdistää numeroituja ja numeroimattomia listoja monimutkaisiin hierarkioihin.

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full"}

1. Ensimmäinen päävaihe
   - Alivaatimus A
   - Alivaatimus B
2. Toinen päävaihe
   - Toinen alikohde
   - Viimeinen alikohde
3. Viimeinen vaihe

#code

```mdc
1. Ensimmäinen päävaihe
   - Alivaatimus A
   - Alivaatimus B
2. Toinen päävaihe
   - Toinen alikohde
   - Viimeinen alikohde
3. Viimeinen vaihe
```
::

## Taulukot

Esitä rakenteista dataa selkeästi riveinä ja sarakkeina. Taulukot sopivat erinomaisesti tietojen vertailuun ja ominaisuuksien listaamiseen.

::code-preview{label="Esikatselu" class="[&>div]:*:my-0 [&>div]:*:w-full"}

| Prop    | Oletus    | Tyyppi                   |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |

#code

```mdc
| Prop    | Oletus    | Tyyppi                   |
|---------|-----------|--------------------------|
| `name`  |           | `string`{lang="ts-type"} |
| `size`  | `md`      | `string`{lang="ts-type"} |
| `color` | `neutral` | `string`{lang="ts-type"} |
```
::

### Kuvat

Kuvat mukautuvat automaattisesti säiliöönsä ja säilyttävät kuvasuhteensa. Kokoa voi tarvittaessa hallita Markdownin tai HTML-attribuuttien avulla.

::code-preview
![Pieni kuva](/catdark.webp){width="300"}

#code

```mdc
![Pieni kuva](/catdark.webp){width="300"}
```
::

::tip
Voit poistaa napsautuksella tapahtuvan zoomauksen lisäämällä `:zoom="false"`
::

## Koodi

- `ts [nuxt.config.ts]` lisää tiedostonimen
- `ts [nuxt.config.ts] {2}` korostaa rivit

::code-preview{label="Esikatselu" class="[&>div]:*:my-0 [&>div]:*:w-full"}

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui']
})
```

#code

````mdc
```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui']
})
```
````

::

### Diff

Käytä `diff`-kieltä näyttääksesi muutokset koodiversioiden välillä.

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full"}

```diff [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
-   '@nuxt/ui-pro'
+   '@nuxt/ui'
  ]
})
```

#code

````mdc
```diff [nuxt.config.ts]
export default defineNuxtConfig({
  modules: [
-   '@nuxt/ui-pro'
+   '@nuxt/ui'
  ]
})
```
````

::

### Rivinsisäinen koodi

- `{color="error"}` vaihtaa värin
- `lang="ts-type"` määrittää kielen

:::code-preview{label="Esikatselu" class="[&>div]:*:my-0"}
`inline code`

#code

```mdc
`inline code`
```

:::

Lisää [komponenttitietoa](https://ui.nuxt.com/docs/typography) englanniksi.

## Vältä

::warning
Hyvin tiukat EU-direktiivit, joten nämä voivat aiheuttaa ongelmia.
::

### Iframet

Ne asentavat yleensä kolmannen osapuolen evästeitä, joten ne ovat erittäin riskialttiita **suostumuksen** vuoksi.

```html
<iframe src="https://www.youtube-nocookie.com/embed/AvG1wqLh-Lg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="aspect-ratio: 16/9; width: 100%;"></iframe>
```