---
title: Kyselyt
description: MDC ja Content-kyselyt.
navigation:
  title: Kyselyt
  icon: i-lucide-file-question-mark
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Jotkin komponentit hakevat lisätietoja [tiedostoista](/guides/query). Itsenäiset komponentit voivat olla hankalia Content-kyselyjen kanssa.

Useimmat tämän sivuston komponentit ovat puhtaita: ne näyttävät vain annetut propsit tai YAML-lohkon. Tämän sivun komponentit lukevat lisäksi sisältökokoelmia, joten niiden data seuraa nykyistä kieltä ja pysyy synkassa sisällön kanssa.

## Bilingual view

Sama sivu englanniksi ja suomeksi vierekkäin, linkitetyllä vierityksellä. Se on tarkoitettu käännösten tarkistamiseen: lohkot pysyvät kohdakkain, vaikka toinen kieli olisi pidempi.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::bilingual-view
---
path: /guides/changelog
height: 40
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::bilingual-view
---
path: /guides/changelog
height: 60
linked: true
---
::
```
:::
:::tabs-item{label="Inline-propsit" icon="i-lucide-code"}
```mdc
::bilingual-view{path="/guides/changelog" :height="60"}
::
```
:::
::

Propsit: `path` (pakollinen, sivun polku ilman kielitunnusta), `height` (yksikkö `vh`, oletus `70`) ja `linked` (linkitetyn vierityksen aloitustila, oletus `true`).

Älä osoita `path`-arvoa sivulle, joka sisältää komponentin. Kaksikielinen näkymä toisen sisällä näyttää varoituksen.

## Stats source

Samat kortit kuin [Tilastoissa](/guides/tools#tilastot), mutta luvut lasketaan itse sivustosta. Arvot seuraavat nykyistä kieltä ja pysyvät ajan tasalla, kun sisältöä lisätään.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::stats-source
---
show: [components, pages, coverage, languages, glossary, problems]
columns: 3
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::stats-source
---
show: [components, pages, coverage, languages, glossary, problems]
columns: 3
---
::
```
:::
:::tabs-item{label="Inline-propsit" icon="i-lucide-code"}
```mdc
::stats-source{show="components, pages, coverage, languages, glossary, problems" :columns="3"}
::
```
:::
::

Propsit: `show` (valinnainen, mitkä kortit näytetään, YAML-listana tai pilkulla erotettuna attribuuttina, oletuksena kaikki) ja `columns` (valinnainen, `2`, `3` tai `4`, oletus `3`).

Kortit ovat:

- `components`: kuinka monta komponenttitiedostoa kansiossa `components/content/` on.
- `pages`: kuinka monta sivua nykyisellä kielellä on.
- `coverage`: suomenkielisten sivujen osuus englanninkielisistä sivuista prosentteina, palkin kera.
- `languages`: kuinka monta kieltä sivustolla on.
- `glossary`: kuinka monta sanaston termiä englanniksi on, eli koko lista.
- `problems`: kuinka monta ongelmaa englanniksi on, eli koko lista.

Nimet, joita ei ole tässä listassa, ohitetaan. Kortit pitävät omat värinsä, joten `show`-suodatus ei koskaan muuta niitä.

Jos kokoelma puuttuu tai laskenta epäonnistuu, kyseinen kortti näyttää ajatusviivan ja muut piirtyvät silti.

Luvut haetaan kerran sivua ja kieltä kohden ja kaikki saman sivun tilastolähteet jakavat ne.


## Term

Tekstin sisäinen sanastotermi. Vie osoitin termin päälle, siirrä siihen kohdistus tai napauta sitä, niin näet lyhyen selityksen. Selitykset tulevat nykyisen kielen sanastomerkinnöistä ja jos käännöstä ei ole, käytetään englantia.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
Nuxt rendröi sivun käyttäen :term[SSR]{name="ssr"} oletuksena lisäten interaktiivisuutta :term[hydraatiolla]{text="Palvelimella renderöidyn HTML:n tekeminen interaktiiviseksi selaimessa."}.
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::term
---
name: ssr
side: top
---
server-side rendering
::
```
:::
:::tabs-item{label="Inline-propsit" icon="i-lucide-code"}
```mdc
Nuxt rendröi sivun käyttäen :term[SSR]{name="ssr"} oletuksena.

Yksittäinen termi, jolle ei ole sanastoselitettä: :term[hydraatiolla]{text="Palvelimella renderöidyn HTML:n tekeminen interaktiiviseksi selaimessa."}
```
:::
::

**Propsit**

- `name`: käytettävä sanastomerkintä eli tiedoston nimi ilman päätettä.
- `text`: yhden rivin selitys, joka näytetään työkaluvihjeessä.
- `title`, `description`, `to`, `icon`: laajempi ponnahdusikkuna. Termi, jolla on `description` tai `to`, avaa ponnahdusikkunan ja termi, jolla on vain `text`, avaa työkaluvihjeen.
- `side`: mihin suuntaan ikkuna aukeaa: `top`, `right`, `bottom` tai `left`. Oletus on `bottom`.
- Paina `Jaa linkki` kopioidaksesi osoitteen, joka sisältää nykyisen tekstin. Osoitteen avaaminen lataa tekstin leikkikenttään, vierittää sen näkyviin ja näyttää ilmoituksen. Hyvin pitkää tekstiä ei voi jakaa linkkinä.


Inline-propsit ohittavat sanastomerkinnän. Jos `name`-arvoa ei löydy, termi näytetään tavallisena tekstinä.

**Sanastomerkinnän lisääminen**

Lisää yksi YAML-tiedosto kumpaakin kieltä kohti samalla tiedostonimellä:

```text
content/
  en/
    glossary/
      ssr.yml
  fi/
    glossary/
      ssr.yml
```

```yaml
title: Palvelinpuolen renderöinti
text: Sivut renderöidään HTML:ksi palvelimella.
description: Palvelin lähettää valmiin HTML:n, joten sisältö näkyy ennen kuin JavaScript on latautunut.
icon: i-lucide-server
```

Kaikki kentät ovat valinnaisia. Merkinnät näkyvät myös sanastosivulla.

## Troubleshooting source

Yhteinen ongelmien kokoelma, jota voi suodattaa tunnisteella. Se ympäröi puhtaan `troubleshooting`-komponentin, joten lista näyttää ja toimii samoin. Suomenkieliset merkinnät korvaavat englanninkieliset, joilla on sama `slug` ja kääntämättömät pysyvät englanniksi.

::tabs
:::tabs-item{label="Esikatselu" icon="i-lucide-eye"}
::::troubleshooting-source
---
tag: content
title: Sisältöongelmat
group: query-demo
---
::::
:::
:::tabs-item{label="YAML" icon="i-lucide-file-code"}
```mdc
::troubleshooting-source
---
tag: content
title: Sisältöongelmat
group: query-demo
---
::
```
:::
:::tabs-item{label="Inline-propsit" icon="i-lucide-code"}
```mdc
::troubleshooting-source{tag="content" title="Sisältöongelmat" group="query-demo"}
::
```
:::
::

Propsit: `tag` (valinnainen, näyttää vain ongelmat, joilla on tämä tunniste), `title` (valinnainen) ja `group` (valinnainen, oletus `source`; käytä eri arvoa jokaiselle samalla sivulla olevalle listalle, jotta niiden hakukentät pysyvät erillään).

Ongelmat sijaitsevat tiedostoissa `content/en/problems/*.yml` ja `content/fi/problems/*.yml`. Käytä samaa `slug`-arvoa molemmilla kielillä, jotta syvälinkit toimivat kielenvaihdon jälkeen.

## Näin komponentit lukevat sisältöä

- Välimuistin avain sisältää kielen, joten kielenvaihto ei koskaan näytä vanhaa dataa.
- Käännökset yhdistetään merkintä kerrallaan `slug`-arvon perusteella, ei sivu kerrallaan.
- Vain komponentin tarvitsemat kentät luetaan.
- Data haetaan kerran sivua kohden ja kaikki saman komponentin esiintymät jakavat sen.
