---
title: Kaaviot
description: Söpöjä kaavioita yhteisölle.
navigation:
  title: Kaaviot
  icon: i-lucide-bar-chart-3
layout: dashboard
sidebar: true
toc: true
collapsed: true
surround: true
---

Valmiita kaavioita yhteisön tiedoille. Jokainen toimii Markdownista MDC:n avulla. Anna kaaviolle lista `data`-propsissa YAML-lohkona, niin kaavio hoitaa lopun.

## Yleiskatsaus

| Komponentti | Kaavio | Datakentät |
| --- | --- | --- |
| `chart-poll` | Rengas tai pylväs | `label`, `count` |
| `chart-attendance` | Viiva | `month`, `count` |
| `chart-revenue` | Pinottu alue | `month`, `revenue`, `costs` |
| `chart-leaderboard` | Vaakapylväs | `member`, `points` |
| `chart-topics` | Rengas | `topic`, `count` |
| `chart-growth` | Alue | `month`, `members` |
| `chart-sprint` | Pinottu pylväs | `sprint`, `done`, `progress`, `blocked` |
| `chart-feedback` | Rengas | `rating`, `count` |

**Hyvä tietää**

- `data` on lista objekteja. Taulukon kenttien nimet ovat kiinteät ja jokainen kaavio lukee vain omat kenttänsä.
- Luvut (`count`, `points`, `revenue`) on kirjoitettava pelkkinä lukuina, ilman lainausmerkkejä tai tuhaterottimia.
- Nimikkeet (`month`, `label`, `topic`, `member`, `sprint`) näytetään sellaisenaan, joten kirjoita ne sivun kielellä.
- Lyhyille arvoille voi käyttää myös inline-propseja. Katso [Propsien antaminen inline-muodossa](/guides/tools#propsien-antaminen-inline-muodossa).

## ChartPoll

Rengas- tai pylväskaavio äänestyksen tuloksille.

:::code-preview
::chart-poll
---
question: Pitäisikö meidän siirtyä Nuxt 5:een?
type: donut
data:
  - { label: Kyllä, count: 42 }
  - { label: Ei, count: 18 }
  - { label: Ehkä, count: 7 }
---
::

#code
```mdc
::chart-poll
---
question: Pitäisikö meidän siirtyä Nuxt 5:een?
type: bar
data:
  - { label: Kyllä, count: 42 }
  - { label: Ei, count: 18 }
---
::
```
:::

Propsit: `question` (äänestyksen otsikko), `type` (`donut` tai `bar`, oletus `donut`) ja `data` (lista, jossa `label` ja `count`).

## ChartAttendance

Viivakaavio arvon seuraamiseen ajan yli, esimerkiksi tapahtumien osallistujamäärälle.

:::code-preview
::chart-attendance
---
title: Kuukausittainen osallistuminen
data:
  - { month: Syys, count: 34 }
  - { month: Loka, count: 51 }
  - { month: Marras, count: 63 }
---
::

#code
```mdc
::chart-attendance
---
title: Kuukausittainen osallistuminen
data:
  - { month: Syys, count: 34 }
  - { month: Loka, count: 51 }
---
::
```
:::

Propsit: `title` ja `data` (lista, jossa `month` ja `count`).

## ChartRevenue

Pinottu aluekaavio, joka vertaa tuloja kuluihin.

:::code-preview
::chart-revenue
---
data:
  - { month: Tam, revenue: 12400, costs: 8200 }
  - { month: Hel, revenue: 18600, costs: 9100 }
  - { month: Maal, revenue: 15300, costs: 7800 }
  - { month: Huo, revenue: 21000, costs: 10400 }
---
::

#code
```mdc
::chart-revenue
---
data:
  - { month: Tam, revenue: 12400, costs: 8200 }
  - { month: Hel, revenue: 18600, costs: 9100 }
---
::
```
:::

Propsit: `data` (lista, jossa `month`, `revenue` ja `costs`).

## ChartLeaderboard

Vaakapylväskaavio parhaille avustajille.

:::code-preview
::chart-leaderboard
---
data:
  - { member: Anna, points: 1240 }
  - { member: Mikko, points: 980 }
  - { member: Sanna, points: 870 }
  - { member: Jussi, points: 620 }
---
::

#code
```mdc
::chart-leaderboard
---
data:
  - { member: Anna, points: 1240 }
  - { member: Mikko, points: 980 }
---
::
```
:::

Propsit: `data` (lista, jossa `member` ja `points`).

## ChartTopics

Rengaskaavio aiheiden jakautumiselle.

:::code-preview
::chart-topics
---
data:
  - { topic: Frontend, count: 34 }
  - { topic: Backend, count: 22 }
  - { topic: DevOps, count: 15 }
  - { topic: Suunnittelu, count: 9 }
---
::

#code
```mdc
::chart-topics
---
data:
  - { topic: Frontend, count: 34 }
  - { topic: Backend, count: 22 }
---
::
```
:::

Propsit: `data` (lista, jossa `topic` ja `count`).

## ChartGrowth

Aluekaavio aktiivisten jäsenten määrälle ajan yli.

:::code-preview
::chart-growth
---
data:
  - { month: Tam, members: 12 }
  - { month: Hel, members: 19 }
  - { month: Maal, members: 27 }
  - { month: Huo, members: 31 }
---
::

#code
```mdc
::chart-growth
---
data:
  - { month: Tam, members: 12 }
  - { month: Hel, members: 19 }
---
::
```
:::

Propsit: `data` (lista, jossa `month` ja `members`).

## ChartSprint

Pinottu pylväskaavio sprintin tilanteelle.

:::code-preview
::chart-sprint
---
data:
  - { sprint: S1, done: 14, progress: 5, blocked: 2 }
  - { sprint: S2, done: 18, progress: 3, blocked: 1 }
  - { sprint: S3, done: 22, progress: 7, blocked: 0 }
---
::

#code
```mdc
::chart-sprint
---
data:
  - { sprint: S1, done: 14, progress: 5, blocked: 2 }
  - { sprint: S2, done: 18, progress: 3, blocked: 1 }
---
::
```
:::

Propsit: `data` (lista, jossa `sprint`, `done`, `progress` ja `blocked`). Jokainen luku on kyseisessä tilassa olevien tehtävien määrä.

## ChartFeedback

Rengaskaavio tapahtumien arvioille.

:::code-preview
::chart-feedback
---
data:
  - { rating: 5, count: 28 }
  - { rating: 4, count: 12 }
  - { rating: 3, count: 4 }
  - { rating: 2, count: 1 }
  - { rating: 1, count: 0 }
---
::

#code
```mdc
::chart-feedback
---
data:
  - { rating: 5, count: 28 }
  - { rating: 4, count: 12 }
---
::
```
:::

Propsit: `data` (lista, jossa `rating`, arvosta 1 arvoon 5 ja `count`).

## ScrollChart

Kaavio, joka kerrotaan vaihe vaiheelta lukijan vierittäessä. Kaavio pysyy kiinnitettynä tekstin viereen ja jokainen vaihe muuttaa sitä, mitkä viivat korostuvat. Ohut edistymispalkki ylhäällä näyttää, kuinka pitkälle lukija on edennyt.

```mdc
::scroll-chart
---
x: year
yLabel: Velka / BKT (%)
series:
  - key: debt
    label: Velka / BKT
    color: error
  - key: unemployment
    label: Työttömyys (%)
    color: info
data:
  - { year: '1986', debt: 16.4, unemployment: 5.3 }
  - { year: '1996', debt: 55.4, unemployment: 15.6 }
  - { year: '2006', debt: 38.0, unemployment: 7.7 }
  - { year: '2016', debt: 68.0, unemployment: 8.8 }
  - { year: '2026', debt: 90, unemployment: 11 }
steps:
  - text: Velka alkaa alhaalta ja ensimmäinen kriisi nostaa sitä nopeasti.
    show: [debt]
    range: ['1986', '1996']
  - text: Vuoteen 2026 mennessä se on ylittänyt 60 %:n rajan.
    show: [debt]
    rules:
      - { y: 60, color: warning }
  - text: Työttömyys seuraa samaa polkua.
    show: [debt, unemployment]
---
::
```

::scroll-chart
---
x: year
yLabel: Velka / BKT (%)
series:
  - key: debt
    label: Velka / BKT
    color: error
  - key: unemployment
    label: Työttömyys (%)
    color: info
data:
  - { year: '1986', debt: 16.4, unemployment: 5.3 }
  - { year: '1996', debt: 55.4, unemployment: 15.6 }
  - { year: '2006', debt: 38.0, unemployment: 7.7 }
  - { year: '2016', debt: 68.0, unemployment: 8.8 }
  - { year: '2026', debt: 90, unemployment: 11 }
steps:
  - text: Velka alkaa alhaalta ja ensimmäinen kriisi nostaa sitä nopeasti.
    show: [debt]
    range: ['1986', '1996']
  - text: Vuoteen 2026 mennessä se on ylittänyt 60 %:n rajan.
    show: [debt]
    rules:
      - { y: 60, color: warning }
  - text: Työttömyys seuraa samaa polkua.
    show: [debt, unemployment]
---
::

**Propsit**

- `data` (pakollinen): piirrettävät rivit, yksi objekti kutakin x-arvoa kohden.
- `x` (pakollinen): rivin kenttä, jota käytetään x-akselina.
- `series` (pakollinen): piirrettävät viivat. Jokaisella on `key` (rivien kenttä), `label` ja valinnainen `color`, joka on Nuxt UI:n värin nimi, kuten `error` tai `info`. Oletus on `primary`.
- `steps` (pakollinen): tarina järjestyksessä.
- `yLabel` (valinnainen): y-akselin otsikko. Se on myös kaavion saavutettava nimi.
- `stepHeight` (valinnainen): kuinka paljon vieritystä kukin vaihe vie, yksikkönä `dvh`. Oletus on `90`. Nosta arvoa hitaampaa tarinaa varten.

**Vaiheen kentät**

- `text` (pakollinen): vaiheessa näytettävä lause. Se on pelkkää tekstiä.
- `show` (valinnainen): korostettavat sarjat `key`-arvolla. Muut himmenevät taustalle. Jätä pois, jos haluat korostaa kaikki.
- `range` (valinnainen): `[from, to]`, kaksi x-arvoa. Vain viivojen tämä osa korostuu. Loput pysyvät näkyvissä mutta haaleina.
- `rules` (valinnainen): vaakasuorat apuviivat. Jokaisella on `y`-arvo ja valinnainen `color`, joka on Nuxt UI:n värin nimi. Oletus on `warning`.

**Hyvä tietää**

- **Akselit eivät koskaan liiku.** Koko aineisto piirretään aina, joten kaavio ei hyppää vaiheiden välillä. Vaiheet muuttavat vain korostusta ja apuviivoja.
- **Kaavio on kiinnitetty tablettileveydestä ylöspäin.** Alle `md`-leveydellä (768 px) se on tekstin yläpuolella ja pysyy kiinnitettynä, kun teksti vierii sen alta. Sen korkeus seuraa näytön korkeutta.
- **Käytä aineistossa lukuja.** Kirjoita vuodet lainattuina merkkijonoina (`'1996'`), jotta ne pysyvät nimikkeinä ja arvot pelkkinä lukuina ilman tuhaterotinta.
- **Jokaisen `series`-listan `key`-arvon on oltava kaikilla riveillä.** Puuttuva arvo piirretään aukkona tai nollana.
- **Yksi sivua kohden.** Edistymispalkki on kiinnitetty sivun yläreunaan, joten kaksi niistä menisi päällekkäin.
- **Pidä se lyhyenä.** Kolmesta kuuteen vaihetta toimii hyvin. Jokainen vaihe vie noin yhden näytöllisen vieritystä.
- **Saavutettavuus.** Nykyisen vaiheen teksti annetaan avustavalle teknologialle kaavion kuvauksena. Viivat eivät ole ainoa tapa lukea aineistoa, joten kirjoita tärkeimmät luvut vaiheen tekstiin.
- **Ilman JavaScriptiä** kaavio ei piirry, mutta vaiheiden tekstit ovat silti sivulla.
