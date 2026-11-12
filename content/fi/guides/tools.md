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

## ChartList

Pylväskaavio, jonka rivejä voi järjestää vetämällä tai lajitella painikkeilla. Järjestys säilytetään `useState`-tilassa, joten se nollautuu sivun uudelleenlatauksessa.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::chart-list
---
state-key: preview
type: bar
data:
  - { month: january, desktop: 186, mobile: 80 }
  - { month: february, desktop: 305, mobile: 200 }
  - { month: march, desktop: 237, mobile: 120 }
  - { month: april, desktop: 73, mobile: 190 }
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::chart-list
---
type: bar
data:
  - { month: january, desktop: 186, mobile: 80 }
  - { month: february, desktop: 305, mobile: 200 }
  - { month: march, desktop: 237, mobile: 120 }
  - { month: april, desktop: 73, mobile: 190 }
---
::
```
:::
:::tabs-item{label="Inline-propsit" icon="i-lucide-code"}
```mdc
::chart-list{type="line" state-key="inline" :data='[{"month":"january","desktop":186,"mobile":80},{"month":"february","desktop":305,"mobile":200}]'}
::
```
:::
::

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

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::compat-matrix
---
columns:
  - Node 18
  - Node 20
  - Node 22
rows:
  - name: Kiinteä
    support: [supported, supported, supported]
  - name: Tailwind CSS
    support: [partial, supported, supported]
    note: Needs the v4 build on Node 18.
  - name: Legacy plugin
    support: [supported, partial, unsupported]
---
::
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::compat-matrix
---
columns:
  - Node 18
  - Node 20
  - Node 22
rows:
  - name: Kiinteä
    support: [supported, supported, supported]
  - name: Tailwind CSS
    support: [partial, supported, supported]
    note: Needs the v4 build on Node 18.
  - name: Legacy plugin
    support: [supported, partial, unsupported]
---
::
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::compat-matrix{:columns='["Node 18","Node 20","Node 22"]' :rows='[{"name":"Kiinteä","support":["supported","supported","supported"]},{"name":"Tailwind CSS","support":["partial","supported","supported"],"note":"Needs the v4 build on Node 18."},{"name":"Legacy plugin","support":["supported","partial","unsupported"]}]'}
::
```
:::

::

## HeroList

Hero, jonka lohkoja (otsikkorivi, otsikko, kuvaus, linkit) voi järjestää vetämällä. Järjestys säilyy `useState`-tilassa, joten se nollautuu sivun uudelleenlatauksessa.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::hero-list
---
headline: Kiinteä
title: Kehitä nopeammin Vuella
description: Vedä lohkoja muuttaaksesi niiden järjestystä.
state-key: preview-fi
links:
  - label: Aloitetaan
    to: /about
    icon: i-lucide-rocket
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::hero-list
---
headline: Kiintea
title: Kehitä nopeammin Vuella
description: Vedä lohkoja muuttaaksesi niiden järjestystä.
sections: [headline, title, description, links]
links:
  - label: Aloitetaan
    to: /about
---
::
```
:::
:::tabs-item{label="Inline-propsit" icon="i-lucide-code"}
```mdc
::hero-list{headline="Kiintea" title="Kehitä nopeammin Vuella" state-key="inline-fi" :links='[{"label":"About","to":"/about"}]'}
::
```
:::
::

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

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
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
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
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
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::install-builder{manager="pnpm" :packages='["@nuxt/ui","tailwindcss"]' :options='[{"label":"Nuxt Content","package":"@nuxt/content","checked":true},{"label":"Nuxt Image","package":"@nuxt/image"}]'}
::
```
:::

::

**Kehitysriippuvuudet**

Aseta `dev`, jos haluat asentaa paketit kehitysriippuvuuksina.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::install-builder{dev manager="npm" :packages='["eslint","typescript"]'}
::
:::

:::tabs-item{label="Koodi" icon="i-lucide-code"}
```mdc
::install-builder{dev manager="npm" :packages='["eslint","typescript"]'}
::
```
:::

::

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
      Nuxt rendröi sivun käyttäen :term[SSR]{name="ssr"} oletuksena.
  - label: Termi ja tietolaatikko
    description: Yksittäinen termi, jolle ei ole sanastoselitettä
    source: |
       Nuxt parantaa sivun käyttöä :term[hydraatiolla]{text="Palvelimella renderöidyn HTML:n tekeminen interaktiiviseksi selaimessa."}.
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::::playground
---
title: Kokeile komponentteja
rows: 8
examples:
  - label: Term
    description: Tekstin seassa oleva sanastotermi ponnahdusikkunalla
    source: |
      Nuxt rendröi sivun käyttäen :term[SSR]{name="ssr"} oletuksena.
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
:::tabs-item{label="Inline-propsit" icon="i-lucide-code"}
```mdc
::playground{title="Inline" source='Nuxt rendröi sivun käyttäen :term[SSR]{name="ssr"} oletuksena.'}
::
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
- Kun lähde sisältää `::`-lohkoja, käytä ulommassa komponentissa neljää kaksoispistettä, kuten YAML-välilehdellä.
- Toisen esimerkin valinta korvaa nykyisen tekstin. Palauta-painike palauttaa ensimmäisen esimerkin.
- Teksti säilyy `useState`-tilassa, joten se säilyy sivunvaihdossa mutta ei koko sivun uudelleenlatauksessa.
- Esikatselu renderöidään vain selaimessa. Palvelimella luodussa HTML:ssä se on tyhjä.

## ProgressCheck

Tarkistuslista, jossa on edistymispalkki. Palkki täyttyy, kun kohteita merkitään tehdyiksi, ja muuttuu vihreäksi, kun kaikki on tehty. Tila säilyy sivujen välillä siirryttäessä, mutta nollautuu, kun sivu ladataan kokonaan uudelleen.

**Kentät**
- `items` (taulukko): listan kohteet. Jokainen on joko merkkijono tai objekti.
- `items[].label` (merkkijono): kohteen teksti. Sen on oltava yksilöllinen listan sisällä.
- `items[].description` (merkkijono, valinnainen): tekstin alla oleva kuvaus.
- `items[].checked` (totuusarvo, valinnainen): aloita kohde valittuna.
- `title` (merkkijono, valinnainen): edistymispalkin yläpuolella näkyvä otsikko.
- `id` (merkkijono, valinnainen): listan tilan yksilöllinen avain. Oletuksena sivun polku, joten anna jokaiselle listalle oma `id`, jos sivulla on useampia.

::tabs

:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
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
:::

:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
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
```
:::

:::tabs-item{label="Rivinsisäiset propsit" icon="i-lucide-code"}
```mdc
::progress-check{title="Päivittäminen" id="migration-v4 :items='["Päivitä riippuvuus","Käynnistä päivittäminen","Tarkista teema","Julkaise"]' :reset-label="Nollaa"}
::
```
:::

::

## Tilastot

Numerokorttien ruudukko, jossa on kuvake, laskuanimaatio ja kohdistinta seuraava valokeila. Käytä sitä itse kirjoittamiisi lukuihin. Jos haluat laskea asioita sivustosta automaattisesti, katso [Tilastojen lähde](/guides/query#tilastojen-lähde).

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::stats
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
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::stats
---
columns: 3
colorful: true
items:
  - label: Komponentit
    value: 24
    icon: i-lucide-puzzle
    color: primary
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
  - label: Viimeisin julkaisu
    value: 4.7.0
    icon: i-lucide-tag
    color: neutral
---
::
```
:::
:::tabs-item{label="Inline-propsit" icon="i-lucide-code"}
```mdc
::stats{:columns="2" :colorful="false"}
::
```
:::
::

Propsit: `items` (pakollinen, korttien lista), `columns` (valinnainen, `2`, `3` tai `4`, oletus `3`) ja `colorful` (valinnainen, oletus `true`).

Jokaisella kohteella on `label` (pakollinen) ja valinnaisesti `value`, `unit`, `icon`, `color`, `progress` ja `to`. Numeerinen `value` laskee ylöspäin ja muotoillaan nykyisen kielen mukaan. Muu arvo näytetään tekstinä, ja puuttuva arvo näyttää ajatusviivan.

Kun `progress: true` ja `value` on numero, kortti näyttää myös palkin. Palkin enimmäisarvo on 100, joten käytä sitä prosenteille. Lainaa `'%'` YAML:ssa, koska pelkkä `%` on siellä erikoismerkki.

`color` on jokin arvoista `primary`, `secondary`, `success`, `info`, `warning`, `error` ja `neutral`. Se määrää valokeilan, kuvakkeen ja palkin värin. Ilman sitä värit kiertävät valmiin joukon läpi. Kun `colorful: false`, kaikki kortit, joilla ei ole `color`-arvoa, käyttävät väriä `primary`. Kortti, jolla on `to`, muuttuu linkiksi, ja valokeila korvaa silloin tavallisen hover-tehosteen.

Luvut laskevat ylöspäin ja kortit häivytetään näkyviin yksi kerrallaan. Molemmat poistetaan käytöstä, kun lukija haluaa vähennettyä liikettä.

Inline-attribuutit asettavat vain `columns`- ja `colorful`-arvot. Itse kortit on annettava YAML-lohkossa, joten pelkkä inline-muoto ei näytä mitään.

## Vianmääritys

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
  - id: tailwind-classes-missing
    problem: Markdownin Tailwind-luokat puuttuvat
    severity: error
    tags: [tailwind, content]
    cause: Tailwind ei skannaa markdown-tiedostoja oletuksena.
    fix: 'Lisää sisältökansiolle @source-direktiivi päätyylitiedostoosi.'
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
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::troubleshooting
---
group: setup
title: Yleisiä ongelmia
searchable: true
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
    links:
      - label: Content-integraatio
        to: https://ui.nuxt.com/docs/getting-started/integrations/content
  - id: links-not-prefixed
    problem: Linkeille ei lisätä kielitunnusta
    severity: info
    since: '4.7+'
    tags: [i18n]
    cause: 'Moduulia @nuxtjs/i18n ei ole asennettu, tai linkki on ulkoinen.'
    fix: 'Asenna @nuxtjs/i18n.'
---
::
```
:::
:::tabs-item{label="Inline-propsit" icon="i-lucide-code"}
```mdc
::troubleshooting{title="Yleisiä ongelmia" group="setup" :searchable="false"}
::
```
:::
::

Propsit: `items` (pakollinen, ongelmalista), `title` (valinnainen), `group` (valinnainen, oletus `default`) ja `searchable` (valinnainen, oletus `true`).

Jokaisella merkinnällä on `id`, `problem`, `cause` ja `fix` (kaikki pakollisia) sekä valinnaisesti `severity` (`error`, `warning` tai `info`, oletus `info`), `tags` (lista), `since` (versiomerkkijono, lainausmerkeissä), `code` (`content` sekä valinnaiset `lang` ja `file`) ja `links` (lista, jossa `label` ja `to`).

Inline-attribuutit asettavat vain yksinkertaiset propsit. Itse lista on annettava YAML-lohkossa, joten pelkkä inline-muoto näyttää tyhjän tilan.

Anna jokaiselle samalla sivulla olevalle listalle oma `group`, jotta niiden hakukentät pysyvät erillään. Merkintään voi linkittää suoraan `id`-arvolla, esimerkiksi `#prose-not-styled`, ja sivu avaa kyseisen merkinnän latautuessaan. Käytä samaa `id`-arvoa molemmilla kielillä, jotta linkit toimivat kielenvaihdon jälkeen.

Jos haluat täyttää listan sisältötiedostoista, katso [Vianmäärityksen lähde](/guides/query#vianmäärityksen-lähde).

## QuizList

Raahaa ja pudota -tietovisa, jossa lukija laittaa vaiheet oikeaan järjestykseen. Luettele kohteet oikeassa järjestyksessä, niin komponentti sekoittaa ne. Se toimii myös näppäimistöllä, sillä jokaisella kohteella on ylös- ja alas-painikkeet.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::quiz-list
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
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
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
hint: '@nuxt/ui pitää asentaa ennen kuin sen rekisteröi.'
---
::
```
:::
:::tabs-item{label="Inline-ominaisuudet" icon="i-lucide-code"}
```mdc
::quiz-list{title="Laita asennuksen vaiheet oikeaan järjestykseen" :items='["Asenna `@nuxt/ui`", "Lisää se `modules`-listaan", "Tuo se tiedostossa `main.css`"]' success="Oikein!" fail="Ei aivan."}
::
```
:::
::

Ominaisuudet: `title` (pakollinen, kysymys), `items` (pakollinen, vaiheet oikeassa järjestyksessä), `success` ja `fail` (pakollisia, Tarkista-painikkeen jälkeen näytettävät viestit) ja `hint` (valinnainen, näytetään kahden väärän yrityksen jälkeen).

Tarkista-painike pysyy pois käytöstä, kunnes lukija on siirtänyt jotain. Väärä vastaus näyttää Yritä uudelleen -painikkeen, ja lista sekoitetaan uudelleen, joten se ei koskaan ala ratkaistussa järjestyksessä.

Vastaus on osa sivua, joten kuka tahansa voi löytää sen sivun lähdekoodista. Käytä tietovisaa oppimiseen, älä salaisiin asioihin.

## Scenario

Lyhyt tarina kerrottuna vaihe vaiheelta. Jokainen vaihe voi viitata virtakohteeseen, joten lukija näkee, miten järjestelmän osat sopivat yhteen. Lukija voi liikkua edestakaisin painikkeilla tai hypätä mihin tahansa vaiheeseen klikkaamalla sitä.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::scenario
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
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
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
```
:::
:::tabs-item{label="Inline-ominaisuudet" icon="i-lucide-code"}
```mdc
::scenario{title="Anna ja tuolit" :steps='[{"title":"Tarve","entity":"intent","description":"Tila tarvitsee kymmenen tuolia."},{"title":"Lupaus","entity":"commitment","description":"Anna lupaa tuoda ne."}]'}
::
```
:::
::

Ominaisuudet: `steps` (pakollinen, lista vaiheista) ja `title` (valinnainen, näytetään askeltajan yläpuolella). Jokaisella vaiheella on `title`, ja valinnaisesti `description` (markdown toimii), `icon` ja `entity`.

`entity` on virtasivun nimi väliviivalla kirjoitettuna, kuten `economic-event`. Se näyttää käännetyn kohteen nimen linkkinä osoitteeseen `/flow/<entity>`. Käytä vain nimiä, jotka löytyvät virtaosiosta, tai linkki ei johda mihinkään.