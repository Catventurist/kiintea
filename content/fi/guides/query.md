---
title: Query
description: MDC ja Content-kyselyt.
navigation:
  title: Query
  icon: i-lucide-file-question-mark
sidebar: true
collapsed: true
splitter: true
toc: true
surround: true
---

Useimmat tämän sivuston komponentit ovat puhtaita: ne renderöivät annetut propsit tai YAML-lohkon. Tämän sivun komponentit lukevat lisäksi sisältökokoelmia, joten niiden tiedot seuraavat nykyistä kieltä ja pysyvät ajan tasalla sisällön kanssa.

Itsenäiset komponentit voivat olla hankalia Content-kyselyjen kanssa, koska kyselyn on toimittava oikealla kielellä ja jaettava tulos esiintymien kesken. Katso säännöt kohdasta [Miten nämä komponentit lukevat sisältöä](#miten-nämä-komponentit-lukevat-sisältöä).

## Yleiskatsaus

| Komponentti | Lukee | Tärkeimmät propsit |
| --- | --- | --- |
| `bilingual-view` | Yhden sivun molemmilla kielillä | `path`, `height`, `linked` |
| `stats-source` | Laskut sivuston sisällöstä | `show`, `columns` |
| `term` | Sanastomerkinnät | `name`, `text`, `side` |
| `troubleshooting-source` | Ongelmamerkinnät | `tag`, `title`, `group` |

## Kaksikielinen näkymä

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
:::tabs-item{label="Koodi" icon="i-lucide-code"}
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
::

Propsit: `path` (pakollinen, sivun polku ilman kielitunnusta), `height` (yksikkönä `vh`, oletus `70`) ja `linked` (linkitetyn vierityksen alkutila, oletus `true`).

Älä osoita `path`-arvoa sivulle, joka sisältää komponentin. Kaksikielinen näkymä toisen sisällä näyttää varoituksen.

## Tilastojen lähde

Samat kortit kuin [Stats](/guides/tools#stats)-komponentissa, mutta luvut lasketaan itse sivustosta. Arvot seuraavat nykyistä kieltä ja pysyvät ajan tasalla, kun sisältöä lisätään.

:::code-preview
::stats-source
---
show: [components, pages, coverage, languages, glossary, problems]
columns: 3
---
::

#code
```mdc
::stats-source
---
show: [components, pages, coverage]
columns: 3
---
::
```
:::

Propsit: `show` (valinnainen, mitkä kortit näytetään, oletuksena kaikki) ja `columns` (valinnainen, `2`, `3` tai `4`, oletus `3`). Inline-attribuutissa `show` voi olla myös pilkuilla erotettu merkkijono, kuten `show="components, pages"`.

Kortit ovat:

- `components`: montako komponenttitiedostoa kansiossa `components/content/` on.
- `pages`: montako sivua nykyisellä kielellä on.
- `coverage`: suomenkielisten sivujen osuus englanninkielisistä prosentteina, palkin kanssa.
- `languages`: montako kieltä sivustolla on.
- `glossary`: montako sanastotermiä englanniksi on, mikä on täysi lista.
- `problems`: montako ongelmaa englanniksi on, mikä on täysi lista.

Nimet, jotka eivät ole tässä listassa, ohitetaan. Kortit säilyttävät omat värinsä, joten `show`-suodatus ei koskaan muuta niitä.

Jos kokoelma puuttuu tai laskenta epäonnistuu, kyseinen kortti näyttää ajatusviivan ja muut renderöityvät silti.

Luvut haetaan kerran sivua ja kieltä kohden ja kaikki saman sivun tilastolähteet jakavat ne.

## Termi

Tekstin seassa oleva sanastotermi. Vie hiiri sen päälle, kohdista se tai napauta sitä nähdäksesi lyhyen määritelmän. Määritelmät tulevat nykyisen kielen sanastomerkinnöistä ja palautuvat englantiin, jos termillä ei ole käännöstä.

:::code-preview
Nuxt renderöi sivut oletuksena :term[SSR]{name="ssr"}-tekniikalla ja tekee niistä sitten interaktiivisia :term[hydraatiolla]{text="Palvelimella renderöidyn HTML:n tekeminen interaktiiviseksi selaimessa."}.

#code
```mdc
Nuxt renderöi sivut oletuksena :term[SSR]{name="ssr"}-tekniikalla.

Yksittäinen termi ilman sanastomerkintää: :term[hydraatio]{text="Palvelimella renderöidyn HTML:n tekeminen interaktiiviseksi selaimessa."}
```
:::

Hakasulkeiden sisällä oleva teksti on se, minkä lukija näkee. Käytössä on myös lohkomuoto, joka ottaa samat propsit YAML-lohkossa ja avaavan ja sulkevan rivin välinen teksti on se, mikä näytetään:

```mdc
::term
---
name: ssr
side: top
---
palvelinpuolen renderöinti
::
```

**Propsit**

- `name`: käytettävä sanastomerkintä, eli tiedoston nimi ilman tiedostopäätettä.
- `text`: yksirivinen määritelmä, joka näytetään työkaluvihjeessä.
- `title`, `description`, `to`, `icon`: monipuolisempi ponnahdusikkuna. Termi, jolla on `description` tai `to`, avaa ponnahdusikkunan ja termi, jolla on vain `text`, avaa työkaluvihjeen.
- `side`: mihin suuntaan ikkuna aukeaa, jokin arvoista `top`, `right`, `bottom` ja `left`. Oletus on `bottom`.

Inline-propsit ohittavat sanastomerkinnän arvot. `name`, jota ei ole olemassa, renderöidään tavallisena tekstinä.

**Sanastomerkinnän lisääminen**

Lisää yksi YAML-tiedosto kieltä kohden, samalla tiedostonimellä molemmissa:

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
description: Palvelin lähettää valmiin HTML:n, joten sivu näyttää sisältöä ennen kuin JavaScript on latautunut.
icon: i-lucide-server
```

Kaikki kentät ovat valinnaisia. Merkinnät luetellaan tulevaisuudessa myös [sanastosivulla](/glossary).

## Vianmäärityksen lähde

Yhteinen ongelmien joukko, suodatettuna tunnisteella. Se kietoo ympärilleen puhtaan `troubleshooting`-komponentin, joten lista näyttää ja toimii samoin. Suomenkieliset merkinnät korvaavat englanninkieliset, joilla on sama `slug` ja käännöstä vailla oleva pysyy englanniksi.

:::code-preview
::troubleshooting-source
---
tag: content
title: Sisältöongelmat
group: query-demo-fi
---
::

#code
```mdc
::troubleshooting-source
---
tag: content
title: Sisältöongelmat
group: query-demo-fi
---
::
```
:::

Propsit: `tag` (valinnainen, näyttää vain ongelmat, joilla on tämä tunniste), `title` (valinnainen) ja `group` (valinnainen, oletus `source`; käytä jokaiselle saman sivun listalle eri arvoa, jotta niiden hakukentät pysyvät erillään).

Ongelmat sijaitsevat tiedostoissa `content/en/problems/*.yml` ja `content/fi/problems/*.yml`. Käytä samaa `slug`-arvoa molemmilla kielillä, jotta suorat linkit toimivat kielenvaihdon jälkeen.

## Miten nämä komponentit lukevat sisältöä

- Välimuistin avain sisältää kielen, joten kielenvaihto ei koskaan näytä vanhaa tietoa.
- Käännökset yhdistetään merkinnöittäin, ei sivuittain. Vianmäärityksen merkinnät yksilöidään `slug`-arvolla ja sanastomerkinnät tiedoston nimellä.
- Luetaan vain ne kentät, joita komponentti tarvitsee.
- Tiedot haetaan kerran sivua kohden ja saman komponentin kaikki esiintymät jakavat ne.
