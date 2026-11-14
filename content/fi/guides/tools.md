---
title: Työkalut
description: Interaktiivisia apuvälineitä, joita voi käyttää Markdownista.
navigation:
  title: Työkalut
  icon: i-lucide-wrench
layout: dashboard
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Pieniä interaktiivisia komponentteja dokumentaatiosivuille. Jokainen toimii Markdownista MDC:n avulla.

## Propsit inline-muodossa

Lyhyet arvot voi kirjoittaa aaltosulkeisiin ja listat JSON-muodossa yksinkertaisten lainausmerkkien sisään. Kaksoispiste nimen edessä (`:sortable`) tarkoittaa, että arvo luetaan JSON:na, joten `:sortable="false"` on totuusarvo ja `sortable="false"` on teksti "false".

```mdc
::tier-list{state-key="demo" :sortable="false" :items='["Nuxt UI","i18n"]'}
::
```

Pidemmät tiedot kirjoitetaan YAML-lohkoon, kuten alla olevissa esimerkeissä. Inline-attribuutit eivät korvaa YAML-lohkoa komponenteissa, joiden sisältö on pitkä lista.

Propsit: `data`, `type` (oletus `bar`), `sortable` (oletus `true`), `stateKey` (oletus `default`).

## CompatMatrix

Yhteensopivuusmatriisi, jossa on yksi rivi kutakin riippuvuutta kohden ja yksi solu kutakin versiota kohden. Jokainen solu näyttää, onko versio tuettu, osittain tuettu vai tukematon. Muuta rivien järjestystä vetämällä tarttumakahvasta.

**Kentät**
- `columns` (merkkijono[]): versiot, jotka näytetään sarakeotsikoina.
- `rows` (taulukko): riippuvuudet, yksi rivi kutakin kohden.
- `rows[].name` (merkkijono): riippuvuuden nimi. Sen on oltava yksilöllinen.
- `rows[].support` (merkkijono[]): yksi tila kutakin saraketta kohden samassa järjestyksessä kuin `columns`. Käytä arvoja `supported`, `partial` tai `unsupported`. Mikä tahansa muu arvo tai puuttuva arvo näytetään tuntemattomana.
- `rows[].note` (merkkijono, valinnainen): lisätieto, joka näytetään rivin työkaluvihjeenä.
- `size` (`xs` | `sm` | `md`, valinnainen): solujen koko. Oletus on `md`.

Älä käytä tiloina arvoja `yes` tai `no`. Jotkin YAML-jäsentimet muuttavat ne totuusarvoiksi.

:::code-preview
::compat-matrix
---
columns:
  - Node 18
  - Node 20
  - Node 22
rows:
  - name: Kiintea
    support: [supported, supported, supported]
  - name: Tailwind CSS
    support: [partial, supported, supported]
    note: Vaatii v4-version Node 18:lla.
  - name: Vanha liitännäinen
    support: [supported, partial, unsupported]
---
::

#code
```mdc
::compat-matrix
---
columns:
  - Node 18
  - Node 20
rows:
  - name: Tailwind CSS
    support: [partial, supported]
    note: Vaatii v4-version Node 18:lla.
---
::
```
:::

## HeroList

Hero, jonka lohkoja (otsikkorivi, otsikko, kuvaus, linkit) voi järjestää vetämällä. Järjestys säilyy `useState`-tilassa, joten se nollautuu sivun uudelleenlatauksessa.

:::code-preview
::hero-list
---
headline: Kiintea
title: Kehitä nopeammin Vuella
description: Vedä lohkoja muuttaaksesi niiden järjestystä.
state-key: preview-fi
links:
  - label: Aloitetaan
    to: /about
    icon: i-lucide-rocket
---
::

#code
```mdc
::hero-list
---
headline: Kiintea
title: Kehitä nopeammin Vuella
sections: [headline, title, description, links]
links:
  - label: Aloitetaan
    to: /about
    icon: i-lucide-rocket
---
::
```
:::

Propsit: `headline`, `title`, `description`, `links`, `sections` (alkujärjestys), `sortable` (oletus `true`), `stateKey` (oletus `default`).

## InstallBuilder

Rakentaa asennuskomennon paketinhallinnasta, pakettilistasta ja valinnaisista lisäosista. Paketinhallinnan valinta on yhteinen kaikille sivun rakentajille. Kopiointipainike kopioi valmiin komennon.

**Kentät**
- `packages` (merkkijono[], valinnainen): paketit, jotka asennetaan aina.
- `options` (taulukko, valinnainen): lisäosat, jotka näytetään valintaruutuina.
- `options[].label` (merkkijono): valintaruudun teksti.
- `options[].package` (merkkijono): paketin nimi, joka lisätään, kun ruutu on valittuna.
- `options[].description` (merkkijono, valinnainen): tekstin alla oleva kuvaus.
- `options[].checked` (totuusarvo, valinnainen): aloita valittuna.
- `dev` (totuusarvo, valinnainen): käyttää kehitysriippuvuuden lippua (`-D`, bunilla `-d`). Oletus on `false`.
- `manager` (`npm` | `pnpm` | `yarn` | `bun`, valinnainen): ensin näytettävä paketinhallinta. Oletus on `pnpm`.

`@`-merkillä alkavat pakettien nimet on lainattava YAMLissa, esimerkiksi `"@nuxt/ui"`.

:::code-preview
::install-builder
---
manager: pnpm
packages:
  - "@nuxt/ui"
  - tailwindcss
options:
  - label: Nuxt Content
    package: "@nuxt/content"
    description: Markdown ja MDC-tuki.
    checked: true
  - label: Nuxt Image
    package: "@nuxt/image"
    description: Optimoidut kuvat.
---
::

#code
```mdc
::install-builder
---
manager: pnpm
packages:
  - "@nuxt/ui"
options:
  - label: Nuxt Content
    package: "@nuxt/content"
    checked: true
---
::
```
:::

**Kehitysriippuvuudet**

Aseta `dev`, jos haluat asentaa paketit kehitysriippuvuuksina.

:::code-preview
::install-builder{dev manager="npm" :packages='["eslint","typescript"]'}
::

#code
```mdc
::install-builder{dev manager="npm" :packages='["eslint","typescript"]'}
::
```
:::


## ProgressCheck

Tarkistuslista, jossa on edistymispalkki. Palkki täyttyy, kun kohteita merkitään tehdyiksi ja muuttuu vihreäksi, kun kaikki on tehty. Tila säilyy sivujen välillä siirryttäessä, mutta nollautuu, kun sivu ladataan kokonaan uudelleen.

**Kentät**
- `items` (taulukko): listan kohteet. Jokainen on joko merkkijono tai objekti.
- `items[].label` (merkkijono): kohteen teksti. Sen on oltava yksilöllinen listan sisällä.
- `items[].description` (merkkijono, valinnainen): tekstin alla oleva kuvaus.
- `items[].checked` (totuusarvo, valinnainen): aloita kohde valittuna.
- `title` (merkkijono, valinnainen): edistymispalkin yläpuolella näkyvä otsikko.
- `id` (merkkijono, valinnainen): listan tilan yksilöllinen avain. Oletuksena sivun polku, joten anna jokaiselle listalle oma `id`, jos sivulla on useampia.
- `resetLabel` (merkkijono, valinnainen): nollauspainikkeen teksti. Inline-muodossa kirjoita `reset-label="Nollaa"` ilman kaksoispistettä.

:::code-preview
::progress-check
---
title: Päivittäminen
id: migration-v4
reset-label: Nollaa
items:
  - label: Päivitä riippuvuus
    description: Asenna uusin versio.
  - label: Käynnistä päivittäminen
  - label: Tarkista teema
  - label: Julkaise
---
::

#code
```mdc
::progress-check
---
title: Päivittäminen
id: migration-v4
items:
  - Päivitä riippuvuus
  - Käynnistä päivittäminen
  - Julkaise
---
::
```
:::

## Stats

Numerokorttien ruudukko, jossa on kuvake, laskuanimaatio ja kohdistinta seuraava valokeila. Käytä sitä itse kirjoittamiisi lukuihin. Jos haluat laskea asioita sivustosta automaattisesti, katso [Tilastojen lähde](/guides/query#tilastojen-lähde).

:::code-preview
::stats
---
columns: 3
items:
  - label: Komponentit
    value: 24
    icon: i-lucide-puzzle
  - label: Sivut
    value: 48
    icon: i-lucide-files
  - label: Käännetty
    value: 80
    unit: '%'
    progress: true
    icon: i-lucide-languages
---
::

#code
```mdc
::stats
---
columns: 3
colorful: true
items:
  - label: Käännetty
    value: 80
    unit: '%'
    progress: true
    icon: i-lucide-languages
    color: success
  - label: Avoimet ongelmat
    value: 3
    icon: i-lucide-circle-alert
    color: warning
    to: https://github.com/nuxt/ui/issues
---
::
```
:::

Propsit: `items` (pakollinen, korttien lista), `columns` (valinnainen, `2`, `3` tai `4`, oletus `3`) ja `colorful` (valinnainen, oletus `true`).

Jokaisella kohteella on `label` (pakollinen) ja valinnaisesti `value`, `unit`, `icon`, `color`, `progress` ja `to`. Numeerinen `value` laskee ylöspäin ja muotoillaan nykyisen kielen mukaan. Muu arvo näytetään tekstinä ja puuttuva arvo näyttää ajatusviivan.

Kun `progress: true` ja `value` on numero, kortti näyttää myös palkin. Palkin enimmäisarvo on 100, joten käytä sitä prosenteille. Lainaa `'%'` YAML:ssa, koska pelkkä `%` on siellä erikoismerkki.

`color` on jokin arvoista `primary`, `secondary`, `success`, `info`, `warning`, `error` ja `neutral`. Se määrää valokeilan, kuvakkeen ja palkin värin. Ilman sitä värit kiertävät valmiin joukon läpi. Kun `colorful: false`, kaikki kortit, joilla ei ole `color`-arvoa, käyttävät väriä `primary`. Kortti, jolla on `to`, muuttuu linkiksi ja valokeila korvaa silloin tavallisen hover-tehosteen.

Luvut laskevat ylöspäin ja kortit häivytetään näkyviin yksi kerrallaan. Molemmat poistetaan käytöstä, kun lukija haluaa vähennettyä liikettä.

Inline-attribuutit asettavat vain `columns`- ja `colorful`-arvot. Itse kortit on annettava YAML-lohkossa.

## QuizList

Raahaa ja pudota -tietovisa, jossa lukija laittaa vaiheet oikeaan järjestykseen. Luettele kohteet oikeassa järjestyksessä, niin komponentti sekoittaa ne. Se toimii myös näppäimistöllä, sillä jokaisella kohteella on ylös- ja alas-painikkeet.

:::code-preview
::quiz-list
---
title: Laita asennuksen vaiheet oikeaan järjestykseen
items:
  - Asenna `@nuxt/ui`
  - Lisää se `modules`-listaan
  - Tuo se tiedostossa `main.css`
success: Oikein!
fail: Ei aivan.
hint: '@nuxt/ui pitää asentaa ennen kuin sen rekisteröi.'
---
::

#code
```mdc
::quiz-list
---
title: Laita asennuksen vaiheet oikeaan järjestykseen
items:
  - Asenna `@nuxt/ui`
  - Lisää se `modules`-listaan
  - Tuo se tiedostossa `main.css`
success: Oikein!
fail: Ei aivan.
---
::
```
:::

Propsit: `title` (pakollinen, kysymys), `items` (pakollinen, vaiheet oikeassa järjestyksessä), `success` ja `fail` (pakollisia, Tarkista-painikkeen jälkeen näytettävät viestit) ja `hint` (valinnainen, näytetään kahden väärän yrityksen jälkeen).

Tarkista-painike pysyy pois käytöstä, kunnes lukija on siirtänyt jotain. Väärä vastaus näyttää Yritä uudelleen -painikkeen ja lista sekoitetaan uudelleen, joten se ei koskaan ala ratkaistussa järjestyksessä.

Vastaus on osa sivua, joten kuka tahansa voi löytää sen sivun lähdekoodista. Käytä tietovisaa oppimiseen, älä salaisiin asioihin.

## ResourceGroup

Lista resursseista ja niiden tekijöistä. Rivejä voi järjestää uudelleen vetämällä. Järjestys on vain komponentin sisällä, joten se nollautuu, kun sivu ladataan kokonaan uudelleen.

:::code-preview
::resource-group
---
items:
  - title: Seuraa resursseja
    to: /flow
    type: artikkeli
    contributors: [lintu]
  - title: Lukuoppaat
    to: /guides
    type: teksti
    contributors: [kissa, koira]
---
::

#code
```mdc
::resource-group
---
items:
  - title: Lukuoppaat
    to: /guides
    type: teksti
    contributors: [kissa, koira]
---
::
```
:::

Propsit: `items`, `avatar` (oletus `/catlight.webp`), `avatarDark` (oletus `/catdark.webp`), `handle` (oletus `true`).

## Scenario

Lyhyt tarina kerrottuna vaihe vaiheelta. Jokainen vaihe voi viitata virtakohteeseen, joten lukija näkee, miten järjestelmän osat sopivat yhteen. Lukija voi liikkua edestakaisin painikkeilla tai hypätä mihin tahansa vaiheeseen klikkaamalla sitä.

:::code-preview
::scenario
---
title: Anna ja tuolit
steps:
  - title: Tarve
    icon: i-lucide-megaphone
    entity: intent
    description: Yhteisötila tarvitsee kymmenen tuolia lauantain yhteiseen ateriaan.
  - title: Lupaus
    icon: i-lucide-handshake
    entity: commitment
    description: Anna lupaa tuoda kymmenen tuolia.
  - title: Se tapahtuu
    icon: i-lucide-truck
    entity: economic-event
    description: Tuolit toimitetaan tilalle perjantaina.
---
::

#code
```mdc
::scenario
---
title: Anna ja tuolit
steps:
  - title: Tarve
    entity: intent
    description: Tila tarvitsee kymmenen tuolia.
  - title: Lupaus
    entity: commitment
    description: Anna lupaa tuoda ne.
---
::
```
:::

Propsit: `steps` (pakollinen, lista vaiheista) ja `title` (valinnainen, näytetään askeltajan yläpuolella). Jokaisella vaiheella on `title` ja valinnaisesti `description` (markdown toimii), `icon` ja `entity`.

`entity` on virtasivun nimi väliviivalla kirjoitettuna, kuten `economic-event`. Se näyttää käännetyn kohteen nimen linkkinä osoitteeseen `/flow/<entity>`. Käytä vain nimiä, jotka löytyvät virtaosiosta, tai linkki ei johda mihinkään.

## TierList

Arvostelutaulu, jossa lukija vetää kohteita tasojen välillä. Kohteet alkavat "Luokittelemattomat"-rivillä. Järjestys säilyy `useState`:ssa, joten se pysyy sivunvaihdoissa mutta nollautuu, kun sivu ladataan kokonaan uudelleen.

:::code-preview
::tier-list
---
state-key: preview-fi
tiers:
  - label: S
    color: error
  - label: A
    color: warning
  - label: B
    color: success
  - label: C
    color: info
items:
  - label: Nuxt UI
    icon: i-lucide-layout-dashboard
  - label: Nuxt Content
    icon: i-lucide-file-text
  - label: VueUse
    icon: i-lucide-zap
  - i18n
---
::

#code
```mdc
::tier-list
---
state-key: favorite-tools
tiers:
  - label: S
    color: error
  - label: A
    color: warning
items:
  - label: Nuxt UI
    icon: i-lucide-layout-dashboard
  - i18n
---
::
```
:::

Propsit: `tiers`, `items`, `stateKey` (oletus `default`), `sortable` (oletus `true`).
